import express from 'express'
import path from 'path'
import movies from './routes/movies'
import categories from './routes/categories'

const server = express()

server.use(express.json())
server.use('/api/v1/movies', movies)
server.use('/api/v1/categories', categories)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.resolve(__dirname, '../dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
  })
}

export default server
