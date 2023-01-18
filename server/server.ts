import express from 'express'
import path from 'path'
import movies from './routes/movies'
import categories from './routes/categories'

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))
server.use('/api/v1/movies', movies)
server.use('/api/v1/categories', categories)

export default server
