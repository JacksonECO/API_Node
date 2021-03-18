const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }
    const { email, passoword } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!passoword) {
      return HttpResponse.badRequest('password')
    }
  }
}
