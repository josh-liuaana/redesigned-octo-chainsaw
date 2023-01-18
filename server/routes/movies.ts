import { Router } from 'express'
import * as db from '../db/movies'

const router = Router()

router.get('/', async (req, res) => {
  const category = Number(req.query.category)
  try {
    const data = isNaN(category)
      ? await db.all()
      : await db.byCategory(category)

    res.json(data)
  } catch (e) {
    console.error(`Database error: ${e}`)
    res.sendStatus(500)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const data = await db.byId(+req.params.id)
    res.json(data)
  } catch (e) {
    console.error(`Database error: ${e}`)
    res.sendStatus(500)
  }
})

export default router
