const router = require('express').Router()
const { Station, Trip } = require('../models')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const { getPagination, getPagingData } = require('../utils/paging')

router.get('/:id', async (req, res) => {
  try {
    let where = {}
    if (req.query.month) {
      const month = req.query.month
      const startDate = new Date(2021, Number(month - 1), 1) // May is 4th month (0-indexed)
      const endDate = new Date(2021, Number(month), 1) // June is 5th month (0-indexed)
      where = {
        departure: {
          [Op.between]: [startDate, endDate],
        },
      }
    }
    const station = await Station.findByPk(req.params.id, {})

    //Total number of journeys starting from the station
    const totalDeparture = await Trip.count({
      include: [],
      where: { ...where, departureId: req.params.id },
    })

    //Total number of journeys end at the station
    const totalReturn = await Trip.count({
      include: [],
      where: { ...where, returnId: req.params.id },
    })

    // The average distance of a journey starting from the station
    const avgDeparture = await Trip.findAll({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('distance')), 'avgDistance'],
      ],
      where: { ...where, departure_id: req.params.id },
    })

    // The average distance of a journey ending at the station
    const avgReturn = await Trip.findAll({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('distance')), 'avgDistance'],
      ],
      where: { ...where, return_id: req.params.id },
    })

    // Top 5 most popular return stations for journeys starting from the station
    const topReturn = await Trip.findAll({
      attributes: [
        'return_id',
        [sequelize.fn('COUNT', sequelize.col('return_id')), 'totalReturns'],
      ],
      include: [
        {
          model: Station,
          as: 'returnStation',
          attributes: ['name'],
        },
      ],
      where: { ...where, departure_id: req.params.id },
      group: ['return_id', 'returnStation.id'],
      limit: 5,
      order: [['totalReturns', 'DESC']],
    })

    //Top 5 most popular departure stations for journeys ending at the station
    const topDeparture = await Trip.findAll({
      attributes: [
        'departure_id',
        [
          sequelize.fn('COUNT', sequelize.col('departure_id')),
          'totalDepartures',
        ],
      ],
      include: [
        {
          model: Station,
          as: 'departureStation',
          attributes: ['name'],
        },
      ],
      where: { ...where, return_id: req.params.id },
      group: ['departure_id', 'departureStation.id'],
      limit: 5,
      order: [['totalDepartures', 'DESC']],
    })

    res.send({
      station,
      totalDeparture,
      totalReturn,
      avgDeparture,
      avgReturn,
      topReturn,
      topDeparture,
    })
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
})

router.get('/', async (req, res) => {
  try {
    let where = {}

    if (req.query.search) {
      where = {
        [Op.or]: [
          {
            nimi: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            namn: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            name: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            osoite: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            adress: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            kaupunki: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            stad: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
        ],
      }
    }
    const page = req.query.page ? req.query.page : 0
    const rows = req.query.rows ? req.query.rows : 5
    const { limit, offset } = getPagination(page, rows)
    const data = await Station.findAndCountAll({
      limit,
      offset,
      where,
    })
    const stations = getPagingData(data, page, limit)

    res.send(stations)
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
})

router.post('/', async (req, res) => {
  try {
    const station = await Station.create(req.body)
    res.send(station)
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
})

module.exports = router
