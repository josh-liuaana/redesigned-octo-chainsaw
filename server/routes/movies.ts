import express from "express";
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

router.post('/', async (req, res) => {
  const movie = req.body
  movie.date_added = Date.now()
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