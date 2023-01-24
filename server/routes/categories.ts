import { Router } from 'express'
import * as db from '../db/categories'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const data = await db.getAll()
    res.json(data)
  } catch (e) {
    console.error(`Database error: ${e}`)
    res.sendStatus(500)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const withMovies = 'withMovies' in req.query
    const id = Number(req.params.id)

    let data
    if (withMovies) {
      data = await db.byIdWithMovies(id)
    } else {
      data = await db.byId(id)
    }

    if (data == null) {
      res.sendStatus(404)
    } else {
      res.json(data)
    }
  } catch (e) {
    console.error(`Database error: ${e}`)
    res.sendStatus(500)
  }
})

export default router
