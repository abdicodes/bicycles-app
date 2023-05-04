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
    const { limit, offset } = getPagination(10, 5)
    const data = await Trip.findAndCountAll({
      include: [
        { model: Station, as: 'departureStation' },
        { model: Station, as: 'returnStation' },
      ],
      limit,
      offset,
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ['id', 'ASC'],
      ],
    })
    const trip = getPagingData(data, 10, limit)

    res.send(trip)
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
})

module.exports = router
