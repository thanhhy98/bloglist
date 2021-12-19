const logger = require('./logger');
const jwt = require('jsonwebtoken');

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'});
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
  
    next(error)
  }

  function tokenFromHeader(req, res, next) {
    const authorization = req.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token =  authorization.slice(7);
    } else  {
      req.token = null;
    }
    next();
}

const userExtractor = (req, res, next) => {
  req.user = jwt.verify(req.token, process.env.SECRET);
  next();
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenFromHeader,
    userExtractor
}