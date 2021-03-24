const LoginRouterComposer = require('../composers/login-composer')
const { adapt } = require('../adapters/express-router-adapter')

module.exports = router => {
  router.post('/login', adapt(LoginRouterComposer.compose()))
}
