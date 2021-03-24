jest.mock('validator', () => ({
  isValid: true,

  isEmail (email) {
    this.email = email
    return this.isValid
  }
}))

const validator = require('validator')
const EmailValidator = require('./email-validator')
const { MissingParamError } = require('./../erros/index')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Shold return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  test('Shold return false if validator returns false', () => {
    validator.isValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)
  })

  test('Shold call validator with correct email', () => {
    const sut = makeSut()
    sut.isValid('invalid_email@mail.com')
    expect(validator.email).toBe('invalid_email@mail.com')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(() => sut.isValid()).toThrow(new MissingParamError('email'))
  })
})
