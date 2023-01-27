/** @jest-environment jsdom */
import nock from 'nock'
import App from '../App'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { initialiseStore } from '../../store'

import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('<MovieList />', () => {
  it('Shows a list of movies', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/movies')
      .reply(200, [
        { id: 1, title: 'Get Out', release_year: 2017 },
        { id: 2, title: 'Some Movie', release_year: 2021 },
      ])

    render(
      <Router initialEntries={['/movie']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </Router>
    )

    const title = await screen.findByRole('link', {
      name: 'Some Movie (2021)',
    })
    expect(title).toBeVisible()
    expect(scope.isDone()).toBeTruthy()
  })

  it('fails to show a list of movies', async () => {
    const scope = nock('http://localhost').get('/api/v1/movies').reply(500)

    render(
      <Router initialEntries={['/movie']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </Router>
    )

    const errorMessage = await screen.findByText(/Error: Internal Server Error/)
    expect(errorMessage).toBeVisible()
    expect(scope.isDone()).toBeTruthy()
  })
})
