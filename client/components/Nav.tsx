import { Link } from "react-router-dom"
import { MouseEvent, useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useAppDispatch, useAppSelector } from "../hooks/redux"

import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated"
import cow from '../../images/cow.png'
import { User } from "../../models/movies"

function Nav() {
  const usersId = useAppSelector(state => state.users as Partial<User>[])
  const { user, loginWithRedirect, logout } = useAuth0()
  const [loggedInUser, setLoggedInUser] = useState({} as User)

  const handleSignIn = async (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault()
    loginWithRedirect()
  }

  const handleSignOut = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault()
    logout({ returnTo: window.location.origin })
  }

  useEffect(() => {    
    user && setLoggedInUser({
      name: user.name,
      email: user.email,
      given_name: user.given_name,
      auth0_id: user.sub
    } as User)

    const getUserData = async () => {
      const idFound = usersId.find(userId => userId.auth0_id === user?.sub)
      !idFound && alert('add more dets please')
    }

    user && getUserData()

  }, [user, usersId])

  return (
    <>
      <header className="header">
        <Link to="/">
          <img src={cow} alt="cow"/>
        </Link>
        <h1 className='title'>Mooo-vies 2.0</h1>
        <div className="login-button">
          <IfAuthenticated>
            <Link to="/" onClick={handleSignOut}>
              <button className="delete-button">
                Logout
              </button>
            </Link>
            <img src={user?.picture} alt='user'/>
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