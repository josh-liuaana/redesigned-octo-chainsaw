/** @jest-environment jsdom */
import nock from 'nock'
import App from '../App'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import store from '../../store'

import { render, waitFor } from '@testing-library/react'

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
})
