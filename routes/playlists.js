const express = require('express')
const router = express.Router()
const config = require('../config')
const Queue = new (require('../jsonAPI/Queue'))(config.baseUrl)

router.get('/:id', (req, res) => {
  const playlistId = req.params.id
  if (isNaN(playlistId) === true) {
    return res.status(400).send('Playlist identifier must be a number')
  }
  Queue.add(`library:playlist:${playlistId}`, 'start', 0, true)
    .then(async response => {
      res.status(response.status).send(await response.json())
    })
})

module.exports = router
