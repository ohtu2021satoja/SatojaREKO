const unknownEndpoint = (req, res, next) => {
    const error = new Error('Unknown endpoint')
    error.status = 404
    next(error)
}

const errorHandler = (err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500)
    res.send({
        error: err.message
    })

    next(err)
}

const authCheck = (req, res, next) => {
    if (!res.user) {
      // if user is not logged in
      res.redirect('/')
    } else {
      next()
    }
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    authCheck
}