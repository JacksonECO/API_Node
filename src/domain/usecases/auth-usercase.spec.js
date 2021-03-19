const { MissingParamError } = require('../../utils/erros/index')

class AuthUseCase {
  constructor (loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
    await this.loadUserByEmailRepository.load(email)
  }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provider', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provider', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('ant_email@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    class LoadUserByEmailRepository {
      async load (email) {
        this.email = email
      }
    }
    const loadUserByEmailRepositoru = new LoadUserByEmailRepository()
    const sut = new AuthUseCase(loadUserByEmailRepositoru)
    await sut.auth('ant_email@mail.com', 'any_passowrd')
    expect(loadUserByEmailRepositoru.email).toBe('ant_email@mail.com')
  })
})
