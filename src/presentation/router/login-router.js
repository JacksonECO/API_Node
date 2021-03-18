const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, passoword } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!passoword) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }
      const accessToken = await this.authUseCase.auth(email, passoword)
      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      } return HttpResponse.ok({ accessToken })
    } catch (erro) {
      // console.log(erro)
      return HttpResponse.serverError()
    }
  }
}
