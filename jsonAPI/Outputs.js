const url = require('url').URL

module.exports = class Outputs {

  constructor (baseUrl) {
    this.baseUrl = baseUrl + 'outputs'
  }

  /**
   * List all available output devices
   *
   * @return {Promise<Response>}
   */
  list () {
    return fetch(this.baseUrl)
  }

  /**
   * Control one individual output device
   *
   * You can un-/select the device and change it's volume.
   *
   * @param {String} id
   * @param {{selected: Boolean, volume: Number}|{selected: Boolean}|{volume: Number}} bodyParams
   * @return {Promise<Response>}
   */
  output (id, bodyParams) {
    let URL = new url(`/api/outputs/${id}`, this.baseUrl)
    return fetch(URL.href, {
      method: 'PUT',
      body: JSON.stringify(bodyParams)
    })
  }
}
