// @vitest-environment jsdom

import { describe, it, expect, afterEach } from 'vitest'
import nock from 'nock'
import App from '../App'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { initialiseStore } from '../../store'

import { screen, render, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

afterEach(cleanup)

/**
 * For our components we're mostly going to write integration tests, running
 * as much of our stack as possible and mocking as little as possible.
 *
 * In this case it means we're going to:
 *
 * 1. mount the whole App for each test
 * 2. set the current route using a MemoryRouter
 * 3. use nock to mock out api calls (both internal and external)
 * 4. use fireEvent or userEvent to interact with the UI
 *
 * All our integration tests can follow this pattern more or less, we never
 * need to mock out the redux store or the API functions and we get coverage
 * of those naturally.
 */

describe('<Search />', () => {
  it('Loads the categories', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/categories')
      .reply(200, [{ id: 1, name: 'Drama' }])

    render(
      <Router initialEntries={['/search']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </Router>
    )

    const checkbox = await screen.findByLabelText('Drama')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
    expect(scope.isDone()).toBeTruthy()
  })

  it('shows a loading indicator for the category picker', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/categories')
      .reply(200, [{ id: 1, name: 'Drama' }])

    render(
      <Router initialEntries={['/search']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </Router>
    )

    expect(scope.isDone()).not.toBeTruthy()
    const loadingText = screen.queryByText(/Loading categories/)
    expect(loadingText).toBeVisible()
  })

  it('shows an error when failing to load categories', async () => {
    nock('http://localhost').get('/api/v1/categories').reply(500)

    render(
      <Router initialEntries={['/search']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </Router>
    )

    const errorMessage = await screen.findByText(/Failed to load categories/)
    expect(errorMessage).toBeVisible()
  })

  it('Searches with title and categories', async () => {
    const scope1 = nock('http://localhost')
      .get('/api/v1/categories')
      .reply(200, [
        { id: 1, name: 'Drama' },
        { id: 2, name: 'Comedy' },
      ])

    render(
      <Router initialEntries={['/search']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </Router>
    )
    const checkbox = await screen.findByLabelText('Comedy')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
    expect(scope1.isDone()).toBe(true)

    userEvent.click(checkbox)
    expect(checkbox).toBeChecked()

    const scope2 = nock('http://localhost')
      .get('/api/v1/movies/search?title=pe&category=2')
      .reply(200, [
        { id: 1, title: "The King's Speech", release_year: 2010 },
        { id: 2, title: 'The Grand Budapest Hotel', release_year: 2014 },
      ])

    const titleInput = screen.getByLabelText('Title')
    userEvent.type(titleInput, 'pe')
    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)

    const resultText = await screen.findByText('2 matching results')
    expect(resultText).toBeInTheDocument()
    expect(screen.getByText("The King's Speech (2010)")).toBeInTheDocument()
    expect(
      screen.getByText('The Grand Budapest Hotel (2014)')
    ).toBeInTheDocument()

    expect(scope2.isDone()).toBeTruthy()
  })

  it('Searches with title', async () => {
    const scope1 = nock('http://localhost')
      .get('/api/v1/categories')
      .reply(200, [
        { id: 1, name: 'Drama' },
        { id: 2, name: 'Comedy' },
      ])

    const screen = render(
      <Router initialEntries={['/search']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </Router>
    )

    await waitFor(() => expect(scope1.isDone()).toBe(true))

    const scope2 = nock('http://localhost')
      .get('/api/v1/movies/search?title=pe')
      .reply(200, [
        { id: 1, title: "The King's Speech", release_year: 2010 },
        { id: 2, title: 'The Grand Budapest Hotel', release_year: 2014 },
      ])

    const titleInput = screen.getByLabelText('Title')
    userEvent.type(titleInput, 'pe')
    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)

    const resultText = await screen.findByText('2 matching results')
    expect(resultText).toBeInTheDocument()
    expect(screen.getByText("The King's Speech (2010)")).toBeInTheDocument()
    expect(
      screen.getByText('The Grand Budapest Hotel (2014)')
    ).toBeInTheDocument()

    expect(scope2.isDone()).toBeTruthy()
  })

  it('checking and unchecking a category excludes it', async () => {
    const scope1 = nock('http://localhost')
      .get('/api/v1/categories')
      .reply(200, [
        { id: 1, name: 'Drama' },
        { id: 2, name: 'Comedy' },
      ])

    const screen = render(
      <Router initialEntries={['/search']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </Router>
    )
    const checkbox = await screen.findByLabelText('Comedy')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
    expect(scope1.isDone()).toBe(true)

    userEvent.click(checkbox)
    expect(checkbox).toBeChecked()

    userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()

    const scope2 = nock('http://localhost')
      .get('/api/v1/movies/search?title=pe')
      .reply(200, [
        { id: 1, title: "The King's Speech", release_year: 2010 },
        { id: 2, title: 'The Grand Budapest Hotel', release_year: 2014 },
      ])

    const titleInput = screen.getByLabelText('Title')
    userEvent.type(titleInput, 'pe')
    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)

    const resultText = await screen.findByText('2 matching results')
    expect(resultText).toBeInTheDocument()
    expect(screen.getByText("The King's Speech (2010)")).toBeInTheDocument()
    expect(
      screen.getByText('The Grand Budapest Hotel (2014)')
    ).toBeInTheDocument()

    expect(scope2.isDone()).toBeTruthy()
  })

  it('Fails when the server is sad', async () => {
    nock.disableNetConnect()
    const scope1 = nock('http://localhost')
      .get('/api/v1/categories')
      .reply(200, [
        { id: 1, name: 'Drama' },
        { id: 2, name: 'Comedy' },
      ])

    render(
      <Router initialEntries={['/search']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </Router>
    )

    await waitFor(() => expect(scope1.isDone()).toBe(true))

    nock('http://localhost').get('/api/v1/movies/search?title=pe').reply(500)

    const titleInput = screen.getByLabelText('Title')
    userEvent.type(titleInput, 'pe')
    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)

    const errorMessage = await screen.findByText(/Search failed:/)
    expect(errorMessage).toMatchInlineSnapshot(`
      <p>
        Search failed: 
        Internal Server Error
      </p>
    `)
  })
})
