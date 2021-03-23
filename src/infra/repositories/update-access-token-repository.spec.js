const MissingParamError = require('../../utils/erros/missing-param-error.js')
const UpdateAccessTokenRepository = require('./update-access-token-repository')
const mongoHelper = require('../helpers/mongo-helper.js')
let db

const makeSut = () => {
  return new UpdateAccessTokenRepository()
}

describe('UpdateAccessToken Repository', () => {
  let fakeUserId

  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
    db = await mongoHelper.getDb()
  })

  beforeEach(async () => {
    const userModel = db.collection('users')
    await userModel.deleteMany()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    fakeUserId = fakeUser.ops[0]._id
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    const sut = makeSut()
    await sut.update(fakeUserId, 'valid_token')
    const updateFakeUser = await db.collection('users').findOne({ _id: fakeUserId })

    expect(updateFakeUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no prams are provaided', async () => {
    const sut = makeSut()

    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(fakeUserId, null)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
