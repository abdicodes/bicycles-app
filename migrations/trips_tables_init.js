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
        console.log(`Total ${data.length} trips have been imported`)
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

    const files = [
      './data/df1-1.csv',
      './data/df1-2.csv',
      './data/df1-3.csv',
      './data/df2-1.csv',
      './data/df2-2.csv',
      './data/df2-3.csv',
      './data/df2-4.csv',
      './data/df3-1.csv',
      './data/df3-2.csv',
      './data/df3-3.csv',
      './data/df3-4.csv',
    ]

    for (const file of files) {
      const data = await dataImporter(file)
      await queryInterface.bulkInsert('trips', data)
    }
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('trips')
  },
}
