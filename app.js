const express = require('express')
const app = express()
const logger = require('./utils/logger')
const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

// Heroku dynamically sets a port

app.use(express.static('dist'))

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}

start()
