class Encrypter {
  async compare (password, hashedPassword) {
    return true
  }
}

describe('Encrypter', () => {
  test('Should return true is bcrypt return true', async () => {
    const sut = new Encrypter()
    const isValid = await sut.compare('any_email@mail.com', 'any_password')
    expect(isValid).toBe(true)
  })
})
