import http from 'http'
import app from './app.js'
import db from './config/db.js'

const PORT = process.env.PORT || 3001
const server = http.createServer()

server.on('request', app)
server.on('exit', async () => {
  await db.close()
})

db.authenticate()
  .then(() => {
    console.log('Connected to db');
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  }, (err) => {
    console.log(err);
    console.log('db connection error', err.messags);
    process.exit(1)
  })
