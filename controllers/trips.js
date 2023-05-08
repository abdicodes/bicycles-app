const router = require('express').Router()
const { Trip, Station } = require('../models')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const { getPagination, getPagingData } = require('../utils/paging')

router.post('/', async (req, res) => {
  try {
    const trip = await Trip.create(req.body)
    res.send(trip)
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
})

router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id, {
      include: [
        { model: Station, as: 'departureStation' },
        { model: Station, as: 'returnStation' },
      ],
    })

    res.send(trip)
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
})

router.get('/', async (req, res) => {
  try {
    //sort query will be used in order object
    const order = req.query.sort
      ? req.query.sort.split(' ')
      : ['departure', 'DESC']

    let where = {}
    if (req.query.search) {
      where = {
        ...where,
        [Op.or]: [
          {
            '$departureStation.nimi$': {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            '$returnStation.nimi$': {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            '$departureStation.namn$': {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            '$returnStation.namn$': {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            '$departureStation.name$': {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            '$returnStation.name$': {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          // {
          //   '$departureStation.osoite$': {
          //     [Op.iLike]: `%${req.query.search}%`,
          //   },
          // },
          // {
          //   '$returnStation.osoite$': {
          //     [Op.iLike]: `%${req.query.search}%`,
          //   },
          // },
          // {
          //   '$departureStation.adress$': {
          //     [Op.iLike]: `%${req.query.search}%`,
          //   },
          // },
          // {
          //   '$returnStation.adress$': {
          //     [Op.iLike]: `%${req.query.search}%`,
          //   },
          // },
          // {
          //   '$departureStation.kaupunki$': {
          //     [Op.iLike]: `%${req.query.search}%`,
          //   },
          // },
          // {
          //   '$returnStation.kaupunki$': {
          //     [Op.iLike]: `%${req.query.search}%`,
          //   },
          // },
          // {
          //   '$departureStation.stad$': {
          //     [Op.iLike]: `%${req.query.search}%`,
          //   },
          // },
          // {
          //   '$returnStation.stad$': {
          //     [Op.iLike]: `%${req.query.search}%`,
          //   },
          // },
        ],
      }
    }

    if (req.query.duration) {
      const duration = req.query.duration
      if (duration === 'short') {
        where = {
          ...where,
          duration: {
            [Op.lte]: 600,
          },
        }
      }
      if (duration === 'long') {
        where = {
          ...where,
          duration: {
            [Op.gt]: 600,
          },
        }
      }
    }

    if (req.query.distance) {
      const distance = req.query.distance
      if (distance === 'short') {
        where = {
          ...where,
          distance: {
            [Op.lte]: 5000,
          },
        }
      }
      if (distance === 'long') {
        where = {
          ...where,
          distance: {
            [Op.gt]: 5000,
          },
        }
      }
    }

    if (req.query.returnCity) {
      where = {
        ...where,
        '$returnStation.kaupunki$': {
          [Op.iLike]: `%${req.query.returnCity}%`,
        },
      }
    }

    if (req.query.departureCity) {
      where = {
        ...where,
        '$departureStation.kaupunki$': {
          [Op.iLike]: `%${req.query.departureCity}%`,
        },
      }
    }

    const page = req.query.page ? req.query.page : 0
    const rows = req.query.rows ? req.query.rows : 5
    const { limit, offset } = getPagination(page, rows)

    const data = await Trip.findAndCountAll({
      include: [
        {
          model: Station,
          as: 'departureStation',
        },
        {
          model: Station,
          as: 'returnStation',
        },
      ],
      limit,
      offset,
      where,

      order: [order],
    })

    const trip = getPagingData(data, page, limit)

    res.send(trip)
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
})

router.delete('/', async (req, res) => {
  try {
    const trip = await Trip.destroy({
      where: {
        departureId: 2000,
        returnId: 2000,
        duration: 9,
        distance: 9,
      },
    })
    res.status(204).end()
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
})

module.exports = router
