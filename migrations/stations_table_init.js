const { DataTypes } = require('sequelize')
const fs = require('fs')
const { parse } = require('csv-parse')

// using promise to push parsed objects from CSV file and INSERT to database table in migration up method
const dataImporter = () => {
  return new Promise((resolve, reject) => {
    const data = []

    fs.createReadStream(`./data/stations.csv`)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', (row) => {
        data.push({
          id: Number(row[1]),
          nimi: String(row[2]),
          namn: String(row[3]),
          name: String(row[4]),
          osoite: String(row[5]),
          adress: String(row[6]),
          kaupunki: String(row[7]),
          stad: String(row[8]),
          capacity: Number(row[10]),
          x: Number(row[11]),
          y: Number(row[12]),
        })
      })
      .on('end', () => {
        console.log(`total ${data.length} stations have been imported`)
        resolve(data)
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}

module.exports = {
  up: async ({ context: queryInterface }) => {
    // Create the stations table

    await queryInterface.createTable('stations', {
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
    })

    // Insert data into the stations table
    const data = await dataImporter()
    await queryInterface.bulkInsert('stations', data)
  },

  // rollback action, here we drop stations table
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('stations')
  },
}
