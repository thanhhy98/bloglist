const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

logger.info(`connecting to ${config.MONGODB_URI}`);
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info(`connected to MongoDB`)
    })
    .catch(error => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors());
app.use(express.json());
app.use(express.static('build'))
app.use(middleware.requestLogger);
app.use(middleware.tokenFromHeader)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter);

if(process.env.NODE_ENV === 'test') {
    const testRouter = require('./controllers/test')
    app.use('/api/testing', testRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint);

module.exports = app;