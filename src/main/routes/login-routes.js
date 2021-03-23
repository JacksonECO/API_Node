const loginRouter = require('../composers/login-composer')
const ExpressRouterAdapter = require('../adapters/express-router-adapter')

module.exports = router => {
  router.post('/login', ExpressRouterAdapter.adpter(loginRouter))
}
