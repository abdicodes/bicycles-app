const { DataTypes } = require('sequelize')
const fs = require('fs')
const { parse } = require('csv-parse')

// we save CSV data to this array
const data = []

// reading and parsing CSV data
fs.createReadStream('./data/asemat.csv')
  .pipe(parse({ delimiter: ',', from_line: 2 }))
  .on('data', (row) => {
    // Kaupunki and Stad columns are missing for Helsinki stations so we fix data manually.

    if (row[7] === ' ') {
      row[7] = 'Helsinki'
    }

    if (row[8] === ' ') {
      row[8] = 'Helsingfors'
    }

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
    console.log(`${data.length} stations have been added`)
  })

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

    await queryInterface.bulkInsert('stations', data)
  },

  // rollback action, here we drop stations table
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('stations')
  },
}
