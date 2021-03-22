const request = require('supertest')
const app = require('../config/app')

describe('Context-Type Middleware', () => {
  test('Should return json content-type as default', async () => {
    app.get('/test_context_type', (req, res) => res.send(''))
    // Tava {}, mas desta forma o teste fica inconclusivo

    await request(app).get('/test_context_type').expect('content-type', /json/)
  })

  test('Should return xml content-type if xml forced', async () => {
    app.get('/test_context_type_xml', (req, res) => {
      // res.set('content-type', 'aplication/xml')
      res.type('xml')
      res.send('')
    })

    await request(app).get('/test_context_type_xml').expect('content-type', /xml/)
  })
})
