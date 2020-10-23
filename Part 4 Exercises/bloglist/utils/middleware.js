const logger = require("./logger")

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")

  logger.info(authorization)
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    logger.info("setting token")
    request.token = authorization.substring(7)
    logger.info("request.token: ", request.token)
	} else {
		request.token = null
	}
	next()
}

const errorHandler = (error, request, response, next) => {
	if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

module.exports = { errorHandler, tokenExtractor }
