const express = require('express')
const router = express.Router()
const config = require('../config')
const Player = new (require('../jsonAPI/Player'))(config.baseUrl)

/**
 * Route to get player status (only there to have something on /)
 */
router.get('/', async (req, res) => {
  Player.status()
    .then(async response => {
      res.status(response.status).send(await response.json())
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Internal Server Error')
    })
})

module.exports = router
