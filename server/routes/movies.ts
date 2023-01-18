import { Router } from 'express'
import * as db from '../db/movies'

const router = Router()

router.get('/', async (req, res) => {
  const category = Number(req.query.category)
  const withCategories = !!req.query.withCategories
  try {
    if (withCategories) {
      const data = await db.allWithCategories()
      console.log(`withCategories`, data)
      res.json(data)
    } else if (!isNaN(category)) {
      const data = await db.byCategory(category)
      res.json(data)
    } else {
      const data = await db.all()
      res.json(data)
    }
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
