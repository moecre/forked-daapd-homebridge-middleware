const express = require('express')
const router = express.Router()
const config = require('../config')
const Player = new (require('../jsonAPI/Player'))(config.baseUrl)

/**
 * Route to stop playback
 */
router.get('/stop', (req, res) => {
  Player.stop()
    .then(response => {
      res.status(response.status)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Internal Server Error')
    })
})

module.exports = router
