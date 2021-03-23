const mongoHelper = require('../helpers/mongo-helper.js')
const LoadUserByEmailRepository = require('./load-user-by-email-repository.js')
const { MissingParamError } = require('../../utils/erros/index')
let db

const makeSut = () => {
  return new LoadUserByEmailRepository()
}

describe('LoadUserByEmailRepository', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
    db = await mongoHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is foud', async () => {
    const sut = makeSut()
    const fakeUser = await db.collection('users').insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const user = await sut.load('valid_email@mail.com')
    expect(user).toEqual({
      _id: fakeUser.ops[0]._id,
      password: fakeUser.ops[0].password
    })
  })

  test('Should throw if no userModel is provaided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
