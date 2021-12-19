const User = require('../models/users');
const bcrypt = require('bcrypt');
const userRouter = require('express').Router();

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1});
    res.json(users);
})

userRouter.post('/', async (req, res, next) => {
    try {
    const body = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.passwordHash, saltRounds);
    const user = new User({
        username: body.username,
        name: body.name,
        image: body.image || process.env.DEFAULT,
        passwordHash
    })

    const savedUser = await user.save();
    res.json(savedUser);
    } catch(error) {
        next(error)
    }
})

module.exports = userRouter;
