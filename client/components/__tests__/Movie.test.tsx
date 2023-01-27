/** @jest-environment jsdom */
import nock from 'nock'
import App from '../App'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { initialiseStore } from '../../store'

import { render, waitFor, screen } from '@testing-library/react'

import '@testing-library/jest-dom'

describe('<Movie />', () => {
  it('Loads and shows information about the movie', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/movies/12?withCategories=true')
      .reply(200, {
        categories: [
          {
            id: 3,
            name: 'Drama',
          },
        ],
        id: 12,
        release_year: 2013,
        title: '12 Years a Slave',
      })

    nock('http://localhost')
      .get('/api/v1/categories')
      .reply(200, [
        {
          id: 3,
          name: 'Drama',
        },
      ])

    const { container } = render(
      <Router initialEntries={['/movie/12']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </Router>
    )

    await screen.findByRole('form', { name: 'Add category to movie' })

    expect(container).toMatchSnapshot()
  })

  it("What happens if the id doesn't exist tho...", async () => {
    nock('http://localhost')
      .get('/api/v1/movies/23934?withCategories=true')
      .reply(404, undefined) // oops this should be a 404

    nock('http://localhost')
      .get('/api/v1/categories')
      .reply(200, [
        {
          id: 3,
          name: 'Drama',
        },
      ])

    const { container } = render(
      <Router initialEntries={['/movie/23934']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </Router>
    )

    const loadingIndicator = await screen.findByText(/Failed/)
    expect(loadingIndicator).toBeVisible()
    expect(container).toMatchSnapshot()
  })
})
