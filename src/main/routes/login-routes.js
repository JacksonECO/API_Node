const loginRouter = require('../composers/login-composer')

module.exports = router => {
  router.post('/login', loginRouter)
}
