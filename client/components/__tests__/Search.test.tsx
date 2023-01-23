/** @jest-environment jsdom */
import nock from 'nock'
import App from '../App'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import store from '../../store'

import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('<Search />', () => {
  it('Loads the categories', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/categories')
      .reply(200, [{ id: 1, name: 'Drama' }])

    render(
      <Router initialEntries={['/search']}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    )

    const checkbox = await screen.findByLabelText('Drama')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
    expect(scope.isDone()).toBeTruthy()
  })

  it('Shows a list of matching results', async () => {
    const scope1 = nock('http://localhost')
      .get('/api/v1/categories')
      .reply(200, [
        { id: 1, name: 'Drama' },
        { id: 2, name: 'Comedy' },
      ])

    render(
      <Router initialEntries={['/search']}>
        <Provider store={store}>
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

  it('Searches with title and categories', async () => {
    const scope1 = nock('http://localhost')
      .get('/api/v1/categories')
      .reply(200, [
        { id: 1, name: 'Drama' },
        { id: 2, name: 'Comedy' },
      ])

    render(
      <Router initialEntries={['/search']}>
        <Provider store={store}>
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
})
