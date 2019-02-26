module.exports = class Player {

  constructor (baseUrl) {
    this.baseUrl = baseUrl + 'player'
  }

  status () {
    return fetch(this.baseUrl)
  }
}
