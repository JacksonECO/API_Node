const mongoHelper = require('../helpers/mongo-helper.js')
let db

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    await this.userModel.updateOne({
      _id: userId
    }, {
      $set: {
        accessToken
      }
    })
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    sut, userModel
  }
}

describe('UpdateAccessToken Repository', () => {
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

  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    await sut.update(fakeUser.ops[0]._id, 'valid_token')
    const updateFakeUser = await userModel.findOne({ _id: fakeUser.ops[0]._id })
    expect(updateFakeUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provaided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const userModel = db.collection('users')
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const promise = sut.update(fakeUser.ops[0]._id, 'valid_token')
    expect(promise).rejects.toThrow()
  })
})
