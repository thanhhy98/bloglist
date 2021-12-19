// const express = require('express');
// const app = express();
// const cors = require('cors');
// const blogRouter = require('./controllers/blogs');
const config = require('./utils/config');
const app = require('./app');
// const middleware = require('./utils/middleware');
// const mongoose = require('mongoose');

// logger.info(`connecting to ${config.MONGODB_URI}`);
// mongoose.connect(config.MONGODB_URI)
//     .then(() => {
//         logger.info(`connected to MongoDB`)
//     })
//     .catch(error => {
//         logger.error('error connecting to MongoDB:', error.message)
//     })

// app.use(cors());
// app.use(express.json());
// app.use(middleware.requestLogger);
// app.use('/api/blogs', blogRouter);
// app.use(middleware.unknownEndpoint);

app.listen(config.PORT);
console.log(`server running on port ${config.PORT}`)