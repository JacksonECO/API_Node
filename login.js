const router = require('express').Router()

module.exports = () => {
  const routerCustom = new SignUpRoute()
  router.post('/sigup', ExpressRouterAdapter.adapt(routerCustom))
}

class ExpressRouterAdapter {
  static adapt (req, res) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await router.route(httpRequest)
      res.status(httpRequest.statusCode).json(httpResponse.body)
    }
  }
}

// Presentation
// SignUp-router
class SignUpRoute {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    const user = new SignUpUseCase().singUp(email, password, repeatPassword)
    return {
      statusCode: 200,
      body: user
    }
  }
}

// Domin
// SignUp-userCase
class SignUpUseCase {
  async singUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepository().add(email, password)
    }
    return {
      statusCode: 400,
      body: 'password must be equal to repeatPassword'
    }
  }
}

// Infra
// add-accont-repo
const AccountModel = require('mongoose').model('Account')

class AddAccountRepository {
  async add (email, password) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
