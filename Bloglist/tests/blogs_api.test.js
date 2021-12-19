const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blogs')

const initialBlogs = [
  {
    title: "test",
    author: "author",
    url: "https://testnodevn.herokuapp.com/api/blogs",
    likes: 3
  },
  {
    title: "testtét",
    author: "NGuen",
    url: "https://testnodevn.netifyapp.com/api/notes",
    likes: 10
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are no blogs', async() => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(2);
})

test('a valid note can be add', async () => {
    const newBlog = {
        title: "new blog",
        author: "NGuen van a",
        url: "https://testnodevn.netifyapp.com/api/notes",
        likes: 14
      }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(initialBlogs.length + 1)
    const name = res.body.map(item => item.author);
    expect(name).toContain('NGuen van a')
})
afterAll(() => {
    mongoose.connection.close();
})