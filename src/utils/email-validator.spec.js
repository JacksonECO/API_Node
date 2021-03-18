const validator = require('validator')

class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

const mekeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Shold return true if validator returns true', () => {
    const sut = mekeSut()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  test('Shold return false if validator returns false', () => {
    validator.isValid = false
    const sut = mekeSut()
    const isEmailValid = sut.isValid('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)
  })

  test('Shold call validator with correct email', () => {
    const sut = mekeSut()
    sut.isValid('invalid_email@mail.com')
    expect(validator.email).toBe('invalid_email@mail.com')
  })
})
