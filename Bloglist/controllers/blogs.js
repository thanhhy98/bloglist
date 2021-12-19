const Blog = require('../models/blogs');
const User = require('../models/users');
const Comment = require('../models/comments')
const jwt = require('jsonwebtoken');
const { findById } = require('../models/blogs');
const blogRouter = require('express').Router();


blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
        .populate('user', {username: 1, name: 1})
        .populate('comments')
    res.json(blogs)
})

blogRouter.get('/:id', async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
    try {
        if(blog) {
            res.json(blog);
        } else {
            res.status(404).end();
        }
    } catch(exception) {
        next(exception);
    }
})

blogRouter.post('/:id/comments', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        const blog = await Blog.findById(req.params.id)
        if(!req.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        const comment = new Comment({
            comment: req.body.comment,
            username: user.name,
            image: user.image,
            user: user._id
        })
        const savedComment = await comment.save()   
        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()
        res.json(savedComment)
    } catch(error) {
        next(error)
    }
})

blogRouter.post('/', async(req, res) => {
    const body = req.body;
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if(!req.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id);
    if(!user) {
        return res.status(404).json({error: 'not found'})
    }
    if(!body.likes) {
        return res.status(400).json({error: 'missing the likes'})
    }
    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    }
    const blog = new Blog(newBlog);
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    res.json(result);

})

blogRouter.delete('/:id', async(req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        const blog = await Blog.findById(req.params.id);
        if(blog.user.toString() === decodedToken.id) {
            await Blog.findByIdAndRemove(req.params.id);
            const user = await User.findById(decodedToken.id);
            user.blogs = user.blogs.filter(blog => blog === req.params.id
                                                    ? false : true);
        await user.save();
        res.status(204).end();
        }
    } catch(error) {
        next(error);
    }
});

blogRouter.put('/:id', async (req, res, next) => {
    const body = req.body;
    const updated = {
        likes: body.likes
    }
    try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updated, {new: true})
        .populate('comments')
        
        if(updatedBlog) {
            res.json(updatedBlog)    
        } else {
            res.status(404).end()
        }
    } catch(exception) {
        next(exception)
    }

})
module.exports = blogRouter;