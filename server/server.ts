import express from 'express'
import movies from './routes/movies'
import categories from './routes/categories'

const server = express()

server.use(express.json())
server.use('/api/v1/movies', movies)
server.use('/api/v1/categories', categories)

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static('/app/dist/assets'))
  server.get('*', (req, res) => {
    res.sendFile('/app/dist/index.html')
  })
}

export default server
