const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}


const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    //set the status to whatever the status code is
    res.status(statusCode)
    res.json({
        // error message comes from the error object
        message: err.message,
        // include the stack ONLY if we are NOT in production (aka if we are in development)
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export { notFound, errorHandler }