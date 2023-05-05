import { Link } from "react-router-dom"
import { ChangeEvent, MouseEvent, FormEvent, useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import Modal from 'react-modal'

import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated"
import cow from '../../images/cow.png'
import { User } from "../../models/movies"
import { addUserThunk } from "../actions/users"

function Nav() {
  const usersId = useAppSelector(state => state.users as Partial<User>[])
  const dispatch = useAppDispatch()
  const { user, loginWithRedirect, logout } = useAuth0()
  const [loggedInUser, setLoggedInUser] = useState({} as User)
  const [modalIsOpen, setModalIsOpen] = useState(false)

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
      !idFound && setModalIsOpen(true)
    }

    user && getUserData()

  }, [user, usersId])

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setLoggedInUser({
      ...loggedInUser,
      [evt.target.name]: evt.target.value
    })
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    dispatch(addUserThunk(loggedInUser))
    setModalIsOpen(false)
  }

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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => alert('NO! ILLEGAL! FILL IN FORM!')}
        className='modal-container'
        contentLabel='Add User Modal'
        >
          <h1>We need one more piece of information please</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              What is your full name?
              <input type='text' name="name" onChange={handleChange}/>
            </label>
            <label htmlFor="given_name">
              What is your preferred name?
              <input type='text' name="given_name" onChange={handleChange}/>
            </label>
            <input type="submit" value='Submit' />
          </form>
      </Modal>
    </>
  )
}

export default Nav