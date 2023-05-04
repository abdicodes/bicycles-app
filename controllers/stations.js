const router = require('express').Router()
const { Station } = require('../models')
const { Op } = require('sequelize')
const sequelize = require('sequelize')

router.get('/:id', async (req, res) => {
  try {
    const trip = await Station.findByPk(req.params.id, {})

    res.send(trip)
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
})

module.exports = router
