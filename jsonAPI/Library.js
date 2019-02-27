const url = require('url').URL

module.exports = class Library {

  constructor (baseUrl) {
    this.baseUrl = baseUrl + 'library'
  }

  /**
   * List all available playlists
   *
   * @return {Promise<Response>}
   */
  playlists () {
    return fetch(this.baseUrl + '/playlists')
  }

  /**
   * List all tracks of one individual playlist
   *
   * @param {String} playlistId
   * @return {Promise<Response>}
   */
  playlistTracks (playlistId) {
    let URL = new url(`/api/library/playlists/${playlistId}/tracks`, this.baseUrl)
    return fetch(URL.href)
  }
}
