const { MissingParamError } = require('../../utils/erros')

module.exports = class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    if (!email) {
      throw new MissingParamError('email')
    }
    const user = await this.userModel.findOne({
      email
    }
    // , {
    //   projection: {
    //     password: 2
    //   }
    // }
    )
    return user
  }
}