const router = require('express').Router()
const { Station } = require('../models')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const { getPagination, getPagingData } = require('../utils/paging')

router.get('/:id', async (req, res) => {
  try {
    const trip = await Station.findByPk(req.params.id, {})

    res.send(trip)
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
})

router.get('/', async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 0
    console.log(req.query.page)
    const { limit, offset } = getPagination(page, 10)
    const data = await Station.findAndCountAll({
      limit,
      offset,
    })
    const stations = getPagingData(data, page, limit)

    res.send(stations)
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
})

module.exports = router
