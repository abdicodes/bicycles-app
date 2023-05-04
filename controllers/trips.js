const router = require('express').Router()
const { Trip, Station } = require('../models')
const { Op } = require('sequelize')
const sequelize = require('sequelize')

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

module.exports = router
