const express = require('express')
require('express-async-errors')
const app = express()
const logger = require('./utils/logger')
const { PORT } = require('./utils/config')
const middleware = require('./utils/middleware')
const { connectToDatabase } = require('./utils/db')
const stationsRouter = require('./controllers/stations')
const tripsRouter = require('./controllers/trips')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)
app.use('/api/stations', stationsRouter)
app.use('/api/trips', tripsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}

start()

module.exports = app
