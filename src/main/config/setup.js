module.exports = app => {
  app.disable('x-powered-by')
  // Permitir que a nossa api receba requisições de outros domínios
  app.use((req, res, next) => {
    res.set('access-control-allow-origin', '*')
    res.set('access-control-allow-methods', '*')
    res.set('access-control-allow-headers', '*')
    next()
  })
}
