const url = require('url').URL

module.exports = class Outputs {

  constructor (baseUrl) {
    this.baseUrl = baseUrl + 'outputs'
  }

  list () {
    return fetch(this.baseUrl)
  }

  output (id, bodyParams) {
    let URL = new url(`/api/outputs/${id}`, this.baseUrl)
    return fetch(URL.href, {
      method: 'PUT',
      body: JSON.stringify(bodyParams)
    })
  }
}
