const _ = require('lodash')
const express = require('express')
const router = express.Router()
const config = require('../config')
const Outputs = new (require('../jsonAPI/Outputs'))(config.baseUrl, config.defaultVolume)

const _getOutputByName = name => {
  return Outputs.list()
    .then(response => {
      if (!(response.status >= 200 && response.status < 300)) {
        return Promise.reject(new Error(response.statusText))
      }
      return response.json()
        .then(json => {
          const { outputs } = json
          return outputs.filter(o => o.name === name)[0]
        })
    })
}

/**
 * Route to get state of one individual output device
 */
router.get('/:name', (req, res) => {
  const outputName = req.params.name

  _getOutputByName(outputName)
    .then(outputByName => {
      if (_.isEmpty(outputByName)) {
        // @todo Let's see what homebridge does with that status and response
        return res.status(204).send('No Content')
      }
      res.send(outputByName.selected ? '1' : '0')
    })
})

/**
 * Route to change state of one individual output device
 */
router.get('/:name/state/:state', (req, res) => {
  const outputName = req.params.name
  const state = (req.params.state === 'on')

  _getOutputByName(outputName)
    .then(outputByName => {
      if (_.isEmpty(outputByName)) {
        // @todo Let's see what homebridge does with that status and response
        return res.status(204).send('No Content')
      }
      return Outputs.output(outputByName.id, { selected: state })
        .then(response => {
          if (!(response.status >= 200 && response.status < 300)) {
            return Promise.reject(new Error(response.statusText))
          }
          return _getOutputByName(outputName)
            .then(refreshedOutputByName => {
              if (_.isEmpty(outputByName)) {
                // @todo Let's see what homebridge does with that status and response
                return res.status(204).send('No Content')
              }
              return refreshedOutputByName
            })
        })
    })
    .then(refreshedOutputByName => {
      res.send(refreshedOutputByName)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Internal Server Error')
    })
})

/**
 * Route to get current volume of one individual output device
 */
router.get('/:name/volume', (req, res) => {
  const outputName = req.params.name

  _getOutputByName(outputName)
    .then(outputByName => {
      if (_.isEmpty(outputByName)) {
        // @todo Let's see what homebridge does with that status and response
        return res.status(204).send('No Content')
      }
      res.send(String(outputByName.volume))
    })
})

/**
 * Route to change volume of one individual output device
 */
router.get('/:name/volume/:volume', (req, res) => {
  const outputName = req.params.name
  const volume = Number(req.params.volume)

  if (volume < 0 || volume > 100) {
    return res.status(400).send('Volume must be a number between 0 and 100')
  }

  _getOutputByName(outputName)
    .then(outputByName => {
      if (_.isEmpty(outputByName)) {
        // @todo Let's see what homebridge does with that status and response
        return res.status(204).send('No Content')
      }
      return Outputs.output(outputByName.id, { volume })
        .then(response => {
          if (!(response.status >= 200 && response.status < 300)) {
            return Promise.reject(new Error(response.statusText))
          }
          return _getOutputByName(outputName)
            .then(refreshedOutputByName => {
              if (_.isEmpty(outputByName)) {
                // @todo Let's see what homebridge does with that status and response
                return res.status(204).send('No Content')
              }
              return refreshedOutputByName
            })
        })
    })
    .then(refreshedOutputByName => {
      res.send(refreshedOutputByName)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Internal Server Error')
    })
})

module.exports = router
