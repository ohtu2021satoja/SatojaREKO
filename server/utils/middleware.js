const unknownEndpoint = (req, res, next) => {
    const error = new Error('Unknown endpoint')
    error.status = 404
    next(error)
}

const errorHandler = (err, req, res, next) => {
    console.log(err.status)
    res.status(err.status || 500)
    res.send({
        error: err.message
    })

    next(err)
}

const authCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('auth ============>')
    return next()
  } else {
    // if user is not logged in
    console.log('not auth ==========>')
    res.redirect('api/auth/notauth')
  }
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    authCheck
}