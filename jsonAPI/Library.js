module.exports = class Library {

  constructor (baseUrl) {
    this.baseUrl = baseUrl + 'library'
  }

  playlists () {
    return fetch(this.baseUrl + '/playlists')
  }
}
