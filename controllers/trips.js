const router = require('express').Router()
const { Trip, Station } = require('../models')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const { getPagination, getPagingData } = require('../utils/paging')

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
    const order = req.query.sort
      ? req.query.sort.split(' ')
      : ['departure', 'DESC']
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

    const whereDeparture = {}
    if (req.query.departureCity) {
      whereDeparture.kaupunki = {
        [Op.iLike]: `%${req.query.departureCity}%`,
      }
    }

    const whereReturn = {}
    if (req.query.returnCity) {
      whereReturn.kaupunki = {
        [Op.iLike]: `%${req.query.returnCity}%`,
      }
    }

    const data = await Trip.findAndCountAll({
      include: [
        {
          model: Station,
          as: 'departureStation',
          where: { ...whereDeparture, ...where },
        },
        {
          model: Station,
          as: 'returnStation',
          where: { ...whereReturn, ...where },
        },
      ],
      limit,
      offset,
      order: [order],
    })

    const trip = getPagingData(data, page, limit)

    res.send(trip)
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
})

module.exports = router
