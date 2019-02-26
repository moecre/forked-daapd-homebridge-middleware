const url = require('url').URL

module.exports = class Queue {

  constructor (baseUrl) {
    this.baseUrl = baseUrl + 'queue'
  }

  list () {
    return fetch(this.baseUrl)
  }

  clear () {
    return fetch(this.baseUrl + '/clear', {
      method: 'PUT'
    })
  }

  add (uris, playback = false, playbackFromPosition = 1, clear = false) {
    let URL = new url('/api/queue/items/add', this.baseUrl)
    URL.searchParams.set('uris', uris)
    URL.searchParams.set('playback', String(playback))
    URL.searchParams.set('playback_from_position', String(playbackFromPosition))
    URL.searchParams.set('clear', String(clear))
    return fetch(URL.href, {
      method: 'POST'
    })
  }
}
