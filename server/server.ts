import express from 'express'

import movies from './routes/movies'

const server = express()

server.use(express.json())
server.use('/api/v1/movies', movies)



if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static('/app/dist/assets'))
  server.get('*', (req, res) => {
    res.sendFile('/app/dist/index.html')
  })
}

export default server
