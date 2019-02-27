module.exports = class Player {

  constructor (baseUrl) {
    this.baseUrl = baseUrl + 'player'
  }

  /**
   * Gets player status
   *
   * @return {Promise<Response>}
   */
  status () {
    return fetch(this.baseUrl)
  }

  /**
   * Stops playback
   *
   * @return {Promise<Response>}
   */
  stop () {
    return fetch(this.baseUrl + '/stop', {
      method: 'PUT'
    })
  }
}
