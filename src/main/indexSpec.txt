// Apenas para connhecimento
// Durante o projeto toda a pasta 'main' foi excuida de qualquer verificação de testes automatizados

describe('Index', () => {
  test('Should call app listen', async () => {
    jest.mock('./config/app', () => ({
      listen (port, callback) {
        if (!callback) {
          callback()
        }
      }
    }))
    const mock = jest.requireMock('./config/app')
    const listen = jest.spyOn(mock, 'listen')
    require('./index')
    expect(listen).toHaveBeenCalledTimes(1)
  })
})
