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
      .get('/api/v1/categories')
      .reply(200, [
        {
          id: 1,
          name: 'Action/Adventure',
        },
        {
          id: 2,
          name: 'Sci-Fi',
        },
        {
          id: 3,
          name: 'Drama',
        },
        {
          id: 4,
          name: 'Thriller',
        },
        {
          id: 5,
          name: 'Comedy',
        },
        {
          id: 6,
          name: 'Fantasy',
        },
        {
          id: 7,
          name: 'History',
        },
        {
          id: 8,
          name: 'Western',
        },
        {
          id: 9,
          name: 'Musical',
        },
      ])

    const { container } = render(
      <Router initialEntries={['/category']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </Router>
    )

    await waitFor(() => expect(scope.isDone()).toBe(true))
    expect(container).toMatchSnapshot()
  })
})
