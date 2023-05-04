const express = require('express')
const app = express()
const logger = require('./utils/logger')
const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')
const stationsRouter = require('./controllers/stations')
const tripsRouter = require('./controllers/trips')
const cors = require('cors')

app.use(cors())
// app.use(express.static('dist'))

app.use('/api/stations', stationsRouter)
app.use('/api/trips', tripsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}

start()
