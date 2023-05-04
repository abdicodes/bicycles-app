const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Station extends Model {}

Station.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    nimi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    namn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    osoite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kaupunki: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    x: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    y: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'station',
  }
)

module.exports = Station
