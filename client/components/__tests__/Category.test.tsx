/** @jest-environment jsdom */
import nock from 'nock'
import App from '../App'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { initialiseStore } from '../../store'

import { render, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom'

describe('<Category />', () => {
  it('Shows information about the category', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/categories/4?withMovies=true')
      .reply(200, {
        id: 4,
        movies: [
          {
            id: 3,
            release_year: 2010,
            title: 'Black Swan',
          },
          {
            id: 11,
            release_year: 2013,
            title: 'Gravity',
          },
        ],
        name: 'Thriller',
      })

    const { container } = render(
      <Router initialEntries={['/category/4']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </Router>
    )

    await waitFor(() => expect(scope.isDone()).toBe(true))
    expect(container).toMatchSnapshot()
  })
})
