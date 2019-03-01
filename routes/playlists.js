const _ = require('lodash')
const express = require('express')
const router = express.Router()
const config = require('../config')
const Queue = new (require('../jsonAPI/Queue'))(config.baseUrl)
const Library = new (require('../jsonAPI/Library'))(config.baseUrl)
const Player = new (require('../jsonAPI/Player'))(config.baseUrl)

/**
 * Gets playlist by name
 *
 * @param {String} name
 * @return {Promise<any>}
 * @private
 */
const _getPlaylistByName = name => {
  return Library.playlists()
    .then(response => {
      if (!(response.status >= 200 && response.status < 300)) {
        return Promise.reject(new Error(response.statusText))
      }
      return response.json()
        .then(json => {
          const { items } = json
          return items.filter(i => i.name === name)[0]
        })
    })
}

/**
 * Route to get playback state of one individual playlist
 */
router.get('/:name', (req, res) => {
  const playlistName = req.params.name
  let queueItem, playlistByName

  Player.status()
    .then(response => {
      if (!(response.status >= 200 && response.status < 300)) {
        return Promise.reject(new Error(response.statusText))
      }
      return response.json()
    })
    .then(playerStatus => {
      if (playerStatus.state === 'stop') {
        // No playback at all
        return Promise.reject(new Error())
      }
      return playerStatus['item_id']
    })
    .then(itemId => {
      /**
       * From here: Check if playlist item is played back
       */
      return Queue.list()
        .then(response => {
          if (!(response.status >= 200 && response.status < 300)) {
            return Promise.reject(new Error(response.statusText))
          }
          return response.json()
        })
        .then(queue => {
          queueItem = queue.items.filter(i => i.id === itemId)[0]
        })
    })
    .then(async () => {
      playlistByName = await _getPlaylistByName(playlistName)

      if (_.isEmpty(playlistByName)) {
        return Promise.reject(new Error('Playlist not found'))
      }
    })
    .then(() => {
      return Library.playlistTracks(playlistByName.id)
        .then(response => {
          if (!(response.status >= 200 && response.status < 300)) {
            return Promise.reject(new Error(response.statusText))
          }
          return response.json()
        })
        .then(playlistTracks => {
          return playlistTracks.items.filter(i => i.id === queueItem['track_id'])[0]
        })
    })
    .then(foundTrack => {
      res.send(_.isObject(foundTrack) ? '1' : '0')
    })
    .catch(err => {
      if (!_.isEmpty(err.message)) {
        console.error(err)
      }
      res.send('0')
    })
})

/**
 * Route to queue up one individual playlist and start playback
 */
router.get('/:name/play', (req, res) => {
  const playlistName = req.params.name

  _getPlaylistByName(playlistName)
    .then(playlistByName => {
      if (_.isEmpty(playlistByName)) {
        return Promise.reject(new Error('Playlist not found'))
      }
      return Queue.add(`library:playlist:${playlistByName.id}`, 'start', 0, true)
        .then(async response => {
          if (!(response.status >= 200 && response.status < 300)) {
            return Promise.reject(new Error(response.statusText))
          }
          return response.json()
        })
    })
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Internal Server Error')
    })
})

module.exports = router
