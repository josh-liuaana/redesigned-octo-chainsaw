import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { initialiseStore } from './store'
import App from './components/App'

export function mount(element: ReactNode = <App />, location = '/') {
  return render(
    <Router initialEntries={[location]}>
      <Provider store={initialiseStore()}>{element}</Provider>
    </Router>
  )
}
