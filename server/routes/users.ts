import express from 'express'

const router = express.Router()

import * as db from '../db/movies'

router.get('/', async (req, res) => {
  try {
    const users = await db.getAllIds()
    res.json(users)
  } catch (error) {
    console.error('Route error:', error)
    res.sendStatus(500)
  }
})

router.get('/:auth0_id', async (req, res) => {
  const auth0_id = req.params.auth0_id
  try {
    const user = await db.getSingleUser(auth0_id)    
    res.json(user)
  } catch (error) {
    console.error('Route error:', error)
    res.sendStatus(500)
  }
})

router.post('/', async (req, res) => {
  const user = req.body
  try {
    const newUser = await db.addUser(user)
    res.json(newUser)
  } catch (error) {
    console.error('Route error:', error)
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.deleteUser(id)
    res.sendStatus(200)
  } catch (error) {
    console.error('Route error:', error)
    res.sendStatus(500)
  }
})

export default router