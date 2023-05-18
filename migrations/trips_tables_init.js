const { DataTypes } = require('sequelize')
const fs = require('fs')
const { parse } = require('csv-parse')

const dataImporter = (path) => {
  return new Promise((resolve, reject) => {
    const data = []

    fs.createReadStream(path)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', (row) => {
        const dist = Number(row[7])
        const dur = Number(row[6])

        if (dist >= 0 && dur >= 0) {
          data.push({
            departure: row[0],
            return: row[1],
            departure_id: Number(row[2]),
            return_id: Number(row[4]),
            distance: Number(row[6]),
            duration: Number(row[7]),
          })
        }
      })
      .on('end', () => {
        console.log(`total ${data.length} trips has been imported`)
        resolve(data)
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('trips', {
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

      departure_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'stations', key: 'id' },
      },
      return_id: {
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
    })

    const data1 = await dataImporter('./data/df1.csv')
    await queryInterface.bulkInsert('trips', data1)

    const data2 = await dataImporter('./data/df2.csv')
    await queryInterface.bulkInsert('trips', data2)

    const data3 = await dataImporter('./data/df3.csv')
    await queryInterface.bulkInsert('trips', data3)

    const data4 = await dataImporter('./data/df4.csv')
    await queryInterface.bulkInsert('trips', data4)

    const data5 = await dataImporter('./data/df5.csv')
    await queryInterface.bulkInsert('trips', data5)
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('trips')
  },
}
