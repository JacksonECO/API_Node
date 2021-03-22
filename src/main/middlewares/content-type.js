module.exports = (req, res, next) => {
  // res.set('content-type', 'aplication/json')
  res.type('json')
  next()
}
