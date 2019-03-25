const url = require('url').URL

module.exports = class Queue {

  constructor (baseUrl) {
    this.baseUrl = baseUrl + 'queue'
  }

  /**
   * List current playback queue
   *
   * @return {Promise<Response>}
   */
  list () {
    return fetch(this.baseUrl)
  }

  /**
   * Adds items to the current playback queue
   *
   * @param {String} uris
   * @param {String=} playback
   * @param {Number=} playbackFromPosition
   * @param {Boolean=} clear
   * @param {Boolean=} shuffle
   * @return {Promise<Response>}
   */
  add (uris, playback = '', playbackFromPosition = 0, clear = false, shuffle = false) {
    let URL = new url('/api/queue/items/add', this.baseUrl)
    URL.searchParams.set('uris', uris)
    URL.searchParams.set('playback', String(playback))
    URL.searchParams.set('playback_from_position', String(playbackFromPosition))
    URL.searchParams.set('clear', String(clear))
    URL.searchParams.set('shuffle', String(shuffle))
    return fetch(URL.href, {
      method: 'POST'
    })
  }
}
