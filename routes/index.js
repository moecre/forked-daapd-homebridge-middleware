const express = require('express')
const logger = require('../libs/logger')
const config = require('../config')
const Player = new (require('../jsonAPI/Player'))(config.baseUrl)
const router = express.Router()

/**
 * Route to get player status (only there to have something on /)
 */
router.get('/', async (req, res) => {
  Player.status()
    .then(async response => {
      res.status(response.status).send(await response.json())
    })
    .catch(err => {
      logger.error(err)
      res.status(500).send('Internal Server Error')
    })
})

module.exports = router
