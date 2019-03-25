const express = require('express')
const logger = require('../libs/logger')
const config = require('../config')
const Player = new (require('../jsonAPI/Player'))(config.baseUrl)
const router = express.Router()

/**
 * Route to stop playback
 */
router.get('/stop', (req, res) => {
  Player.stop()
    .then(response => {
      res.status(response.status).send(response.statusText)
    })
    .catch(err => {
      logger.error(err)
      res.status(500).send('Internal Server Error')
    })
})

module.exports = router
