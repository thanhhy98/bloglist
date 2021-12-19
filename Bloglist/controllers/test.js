const testRouter = require('express').Router();
const User = require('../models/users');
const Blog = require('../models/blogs');

testRouter.post('/reset', async (req, res) => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    res.status(204).end()
})

module.exports = testRouter;