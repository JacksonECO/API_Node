module.exports = {
  isValid: true,
  email: '',

  isEmail (email) {
    this.email = email
    return this.isValid
  }
}
