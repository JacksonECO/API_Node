const { MissingParamError } = require('../../utils/erros/index')
const AuthUseCase = require('./auth-usecase')

const makeSut = () => {
  class EncrypterSpy {
    async compare (password, hasherdPassword) {
      this.password = password
      this.hasherdPassword = hasherdPassword
    }
  }
  const encrypterSpy = new EncrypterSpy()
  class LoadUserByEmailRepository {
    async load (email) {
      this.email = email
      return this.user
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepository()
  loadUserByEmailRepositorySpy.user = { password: 'hashed_password' }
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy, encrypterSpy)
  return { sut, loadUserByEmailRepositorySpy, encrypterSpy }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provider', async () => {
    const { sut } = makeSut()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provider', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('ant_email@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('ant_email@mail.com', 'any_passowrd')
    expect(loadUserByEmailRepositorySpy.email).toBe('ant_email@mail.com')
  })

  test('Should thowr if no LoadUserByEmailRepository is provider', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('ant_email@mail.com', 'any_passowrd')
    expect(promise).rejects.toThrow()
  })

  test('Should thowr if no LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth('ant_email@mail.com', 'any_passowrd')
    expect(promise).rejects.toThrow()
  })

  test('Should return null if an invalid email is provider', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accesssToken = await sut.auth('invalid_email@mail.com', 'any_passowrd')
    expect(accesssToken).toBeNull()
  })

  test('Should return null if an invalid password is provide', async () => {
    const { sut } = makeSut()
    const accesssToken = await sut.auth('valid_email@mail.com', 'invalid_passowrd')
    expect(accesssToken).toBeNull()
  })

  test('Should call Encrypter with correct password value', async () => {
    const { sut, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut()
    await sut.auth('valid_email@mail.com', 'any_passowrd')
    expect(encrypterSpy.password).toBe('any_passowrd')
    expect(encrypterSpy.hasherdPassword).toBe(loadUserByEmailRepositorySpy.user.password)
  })
})
