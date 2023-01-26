/** @jest-environment jsdom */
import nock from 'nock'
import App from '../App'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import store from '../../store'

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
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    )

    await waitFor(() => expect(scope.isDone()).toBe(true))

    expect(container).toMatchSnapshot()
  })

  it("What happens if the id doesn't exist tho...", async () => {
    const scope = nock('http://localhost')
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
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    )

    //await waitFor(() => expect(scope.isDone()).toBe(true))

    const loadingIndicator = await screen.findByText('Loading...')
    expect(loadingIndicator).toBeVisible()
    expect(container).toMatchInlineSnapshot(`
      <div>
        <header
          class="header"
        >
          <h1>
            Movie Facts
          </h1>
        </header>
        <nav>
          <ul>
            <li>
              <a
                href="/movie"
              >
                All movies
              </a>
            </li>
            <li>
              <a
                href="/category"
              >
                All categories
              </a>
            </li>
            <li>
              <a
                href="/search"
              >
                Search
              </a>
            </li>
          </ul>
        </nav>
        <section
          class="main"
        >
          <p>
            Loading...
          </p>
        </section>
      </div>
    `)
  })
})
