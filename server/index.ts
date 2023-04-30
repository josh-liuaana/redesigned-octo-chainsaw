import server from './server'

const PORT = process.env.PORT || 3000

if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  const envConfig = require('dotenv').config()
  if(envConfig.error) throw envConfig.error
}

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', PORT, 'but, i am not actually lol')
})
