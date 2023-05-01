// @vitest-environment jsdom
// import { describe, it, expect, afterEach } from 'vitest'
// import { render, screen, cleanup } from '@testing-library/react'
// import { BrowserRouter as Router } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import { initialiseStore } from '../../store'
// import nock from 'nock'
// import matchers from '@testing-library/jest-dom/matchers'

// import App from '../App'
// import SingleMovie from '../SingleMovie'
// import { mockDb, movieFromDb } from '../../../models/mock-data'

// afterEach(cleanup)

// describe('test set up', () => {
//   it('testing testing', () => {
//     expect('hello').toBeTypeOf('string')
//   })
// })

// describe('<SingleMovie />', () => {
//   it('does what its supposed to do', async () => {
//     const scope = nock('http://localhost')
//       .get('/api/v1/movies')
//       .reply(200, mockDb)

//     render(
//       <Router>
//         <Provider store={initialiseStore()}>
//           <SingleMovie movie={movieFromDb}/>
//         </Provider>
//       </Router>
//     )
//     const title = await screen.findByRole('heading')
//     expect(title.textContent).toBe('Cars')
    
//   })
// })