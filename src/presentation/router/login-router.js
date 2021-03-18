const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
      return HttpResponse.serverError()
    }
    const { email, passoword } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!passoword) {
      return HttpResponse.badRequest('password')
    }
    const accessToken = this.authUseCase.auth(email, passoword)
    if (!accessToken) {
      return HttpResponse.unauthorizedError()
    } return HttpResponse.ok()
  }
}
