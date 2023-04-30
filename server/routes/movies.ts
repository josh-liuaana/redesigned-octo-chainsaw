import express from "express";

import checkJwt, { JwtRequest } from '../auth0'

const router = express.Router()

import * as db from '../db/movies'

router.get('/', async (req, res) => {
  try {
    const movies = await db.getAllMovies()
    res.json(movies)
  } catch (error) {
    console.error('Route error: ', error)
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.delMovie(id)
    res.sendStatus(200)
  } catch (error) {
    console.error('Route error: ', error)
    res.sendStatus(500)
  }
})

// Protect the add route (initially)
// Gameplan will be to protect all, so that you can only see and modify your own watchlists
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const movieData = req.body
  const auth0Id = req.auth?.sub
  const movie = {...movieData, added_by_user: auth0Id}

  try {
    const newMovie = await db.insertMovie(movie)
    res.json(newMovie[0])
  } catch (error) {
    console.error('Route error: ', error)
    res.sendStatus(500)
  }
})

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const seen = req.body.seen
  try {
    await db.updateMovie(id, seen)
    res.sendStatus(200)
  } catch (error) {
    console.error('Route error: ', error)
    res.sendStatus(500)
  }
})

export default router