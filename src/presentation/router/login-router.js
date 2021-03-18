const HttpResponse = require('../helpers/http-response')
const InvalidParamError = require('../helpers/invalid-param-error copy')
const MissingParamError = require('../helpers/missing-param-error')

module.exports = class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, passoword } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
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
