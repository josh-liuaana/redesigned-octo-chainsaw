import express from "express";
const router = express.Router()

import * as db from '../db/movies'

router.get('/', (req, res) => {
  db.getAllMovies()
    .then((moviesArr) => {
      res.json(moviesArr)
    })
    .catch((err) => {
      res.status(500).json({ message: err.message })
    })
})

export default router