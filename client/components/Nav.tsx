import { Link } from "react-router-dom"
import { MouseEvent, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"

import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated"

function Nav() {
  const { user, loginWithRedirect, logout } = useAuth0()

  const handleSignIn = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault()
    loginWithRedirect()
  }

  const handleSignOut = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault()
    logout()
  }
  
  return (
    <>
      <header className="header">
        <Link to="/">
          <img src="/client/assets/cow.png" alt="cow"/>
        </Link>
        <h1 className='title'>Mooo-vies 2.0</h1>
        <div className="login-button">
          <IfAuthenticated>
            <Link to="/" onClick={handleSignOut}>
              <button className="delete-button">
                Logout
              </button>
            </Link>
            <img src={user?.picture} />
            <p>{user?.given_name}</p>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <Link to="/" onClick={handleSignIn}>
              <button className="green-button">
                Login
              </button>
            </Link>
          </IfNotAuthenticated>
        </div>
      </header>
    </>
  )
}

export default Nav