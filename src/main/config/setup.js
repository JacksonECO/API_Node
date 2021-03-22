const cors = require('../middlewares/cors')

module.exports = app => {
  app.disable('x-powered-by')
  // Permitir que a nossa api receba requisições de outros domínios
  app.use(cors)
  // app.use()
}
