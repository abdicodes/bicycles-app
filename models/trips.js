const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Trip extends Model {}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    departure: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    departureId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'stations', key: 'id' },
    },
    returnId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'stations', key: 'id' },
    },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'trip',
  }
)

module.exports = Trip
