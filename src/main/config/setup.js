const cors = require('../middlewares/cors')
const jsonParse = require('../middlewares/json-parser')
const contentType = require('../middlewares/content-type')

module.exports = app => {
  app.disable('x-powered-by')

  app.use(cors)// Permitir que a nossa api receba requisições de outros domínios

  app.use(jsonParse)
  app.use(contentType)
}
