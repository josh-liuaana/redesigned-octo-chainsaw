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
    const data = await db.byId(+req.params.id)
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
