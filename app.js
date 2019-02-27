require('es6-promise').polyfill()
require('isomorphic-fetch')

const express = require('express')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const outputsRouter = require('./routes/outputs')
const playerRouter = require('./routes/player')
const playlistsRouter = require('./routes/playlists')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/outputs', outputsRouter)
app.use('/player', playerRouter)
app.use('/playlists', playlistsRouter)

module.exports = app
