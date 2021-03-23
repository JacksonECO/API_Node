const { MissingParamError } = require('../../utils/erros')
const MomgoHelper = require('../helpers/mongo-helper')

module.exports = class LoadUserByEmailRepository {
  async load (email) {
    if (!email) {
      throw new MissingParamError('email')
    }
    const db = await MomgoHelper.getDb()
    const user = await db.collection('users').findOne({
      email
    }
    , {
      projection: {
        password: 1
      }
    }
    )
    return user
  }
}
