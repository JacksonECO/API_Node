const request = require('supertest')
const app = require('../config/app')

describe('Context-Type Middleware', () => {
  test('Should return json content-type as default', async () => {
    app.get('/test_context_type', (req, res) => { res.send('{}') })
    // Tava {}, mas desta forma o teste fica inconclusivo

    await request(app).get('/test_context_type').expect('content-type', /json/)
  })
})
