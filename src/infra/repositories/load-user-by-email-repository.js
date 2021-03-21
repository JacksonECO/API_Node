module.exports = class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
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
