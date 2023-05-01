// @vitest-environment jsdom
// import nock from 'nock'
// import { Provider } from 'react-redux'
// import { MemoryRouter as Router } from 'react-router-dom'
// import { initialiseStore } from '../../store'

// import { describe, it, expect, afterEach } from 'vitest'
// import { render, screen, within, cleanup } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import matchers from '@testing-library/jest-dom/matchers'

// import Search from '../Search'
// import App from '../App'
// import { mockDb, movieFromDb } from '../../../models/mock-data'

// expect.extend(matchers)
// afterEach(cleanup)

// describe('G wtf is actually going on?', () => {
//   it('like, does a thing maybe', async () => {
//     const getScope = nock('http://localhost')
//       .get('/api/v1/movies')
//       .reply(200, mockDb)

//     const postScope = nock('http://localhost')
//       .post('/api/v1/movies')
//       .reply(200, movieFromDb)

//     render(
//       <Router>
//         <Provider store={initialiseStore()}>
//           <Search />
//           {/* <App /> */}
//         </Provider>
//       </Router>
//     )
//     // screen.debug()

//     const form = await screen.findByRole('form', { name: 'Add movie'})
//     expect(form).toBeInTheDocument()
//     // expect(getScope.isDone()).toBeTruthy()
    
//     const searchField = within(form).getByLabelText('Search movie')
//     const submit = within(form).getByRole('button', {name: 'Search'})

//     userEvent.type(searchField, 'Up')
//     userEvent.click(submit)

//     // await waitFor(() => expect(scope2.isDone()).toBe(true))
//   })
// })