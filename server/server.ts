import express from 'express'
import path from 'path'
import movies from './routes/movies'
import categories from './routes/categories'

const server = express()

server.use(express.json())
server.use('/api/v1/movies', movies)
server.use('/api/v1/categories', categories)
server.use(express.static(path.join(__dirname, 'public')))
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

export default server
