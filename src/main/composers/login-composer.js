const LoginRouter = require('../../presentation//router/login-router')
const EmailValidator = require('../../utils/helpers/email-validator')
const AuthUseCase = require('../../domain/usecases/auth-usecase')
const LoudUserCaserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../infra/repositories/update-access-token-repository')
const Encrypter = require('../../utils/helpers/encrypter')
const TokenGenerator = require('../../utils/helpers/token-generator')
const env = require('../config/env')

const tokenGenerator = new TokenGenerator(env.tokenSecret)
const encrypter = new Encrypter()
const loudUserCaserByEmailRepository = new LoudUserCaserByEmailRepository()
const updateAccessTokenRepository = new UpdateAccessTokenRepository()

const emailValidator = new EmailValidator()
const authUseCase = new AuthUseCase({
  loudUserCaserByEmailRepository,
  updateAccessTokenRepository,
  encrypter,
  tokenGenerator
})

const loginRouter = new LoginRouter({
  authUseCase,
  emailValidator
})

module.exports = loginRouter
