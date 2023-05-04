const Station = require('./stations')
const Trip = require('./trips')

Trip.belongsTo(Station, { foreignKey: 'departureId', as: 'departureStation' })
Trip.belongsTo(Station, { foreignKey: 'returnId', as: 'returnStation' })
module.exports = {
  Station,
  Trip,
}
