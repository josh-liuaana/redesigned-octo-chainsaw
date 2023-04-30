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

  const pictureCheck = (image: string) => {
    if (image.includes('gravatar')) {
      console.log('stock image')
      return "./cow.png"
    } else {
      return image
    }
  }
  
  return (
    <>      
      <header className="header">
        <h1 className='title'>Mooo-vies 2.0</h1>
      </header>
      <IfAuthenticated>
        <Link to="/" onClick={handleSignOut}>
          <button>
            Logout
          </button>
        </Link>
        <img src={user?.picture} />
        <p>{user?.given_name}</p>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Link to="/" onClick={handleSignIn}>
          <button>
            Login
          </button>
        </Link>
      </IfNotAuthenticated>
    </>
  )
}

export default Nav