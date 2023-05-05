import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import Modal from 'react-modal'

import App from './components/App'
import { Auth0Provider } from '@auth0/auth0-react'

Modal.setAppElement(document.getElementById('app') as HTMLElement)

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain='facil-joshliu.au.auth0.com'
      clientId='LPmXLj6Y5eNaXiEo3BA7MEEwJWNkH2Sq'
      redirectUri={window.location.origin}
      audience='https://mooo-vies/api'
    >
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </Auth0Provider>
  )
})
