const express = require('express')
const router = express.Router()
const config = require('../config')
const Player = new (require('../jsonAPI/Player'))(config.baseUrl)

router.get('/', async (req, res) => {
  Player.status()
    .then(async response => {
      res.status(response.status).send(await response.json())
    })
})

module.exports = router
