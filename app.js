require('es6-promise').polyfill()
require('isomorphic-fetch')

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const outputsRouter = require('./routes/outputs')
const playlistsRouter = require('./routes/playlists')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/outputs', outputsRouter)
app.use('/playlists', playlistsRouter)

module.exports = app
