import express from 'express'
import request from 'superagent'

import path from 'path'
import dotenv from 'dotenv'
const envPath = path.join(__dirname, '../../.env')
dotenv.config({ path: envPath })

const router = express.Router()

const imdbURL = 'https://imdb-api.com/en/API'

router.get('/search/:movie', async (req, res) => {
  const movie = req.params.movie
  try {
    const result = await request.get(`${imdbURL}/SearchMovie/${process.env.IMDB_KEY}/${movie}`)
    return res.json(result.body.results)
  } catch (error) {
    console.error('IMDB Route error: ', error)
    res.sendStatus(500)
  }
})

router.get('/info/:id', async (req, res) => {
  const id = req.params.id
  try {
    const result = await request.get(`${imdbURL}/Title/${process.env.IMDB_KEY}/${id}`)
    return res.json(result.body)
  } catch (error) {
    console.error('IMDB Route error: ', error)
    res.sendStatus(500)
  }
})

router.get('/trailer/:id', async (req, res) => {
  const id = req.params.id
  try {
    const result = await request.get(`${imdbURL}/YouTubeTrailer/${process.env.IMDB_KEY}/${id}`)
    return res.json(result.body)
  } catch (error) {
    console.error('IMDB Route error: ', error)
    res.sendStatus(500)
  }
})

export default router