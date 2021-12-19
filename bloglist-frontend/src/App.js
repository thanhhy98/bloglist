import React, { useState, useEffect } from 'react'
import { Blog,  BlogList } from './components/Blog'
import blogService from './services/blogs'
import usersService from './services/users'
import Notification from './notification/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import Users from './components/Users';
import UserDetail from './components/UserDetail';
import { useDispatch, useSelector } from 'react-redux'
import { safeAction } from './reducers/noticeReducer'
import { addBlog, addLike, initBlogs, removeFromBlog } from './reducers/blogsReducer';
import { logOut, initUser } from './reducers/userReducer';
import Register from './components/Register';
import { Table, TableContainer, TableBody, Paper, Button,
     Toolbar, Typography, AppBar, Box, Pagination, Stack } from '@mui/material';
import { Routes, Route, useMatch, Link, Navigate } from 'react-router-dom'
import BookIcon from '@mui/icons-material/Book';
import LoginForm from './components/Login';

const App = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)

  const dispatch = useDispatch()
  const showAlert = useSelector(state => state.showAlert)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  if(user) {
    blogService.setToken(user.token)
  }
  const sortByLikes = blogs.slice().sort((blog1, blog2) => blog2.likes - blog1.likes)
  const pagination = sortByLikes.slice((page - 1) * 5, page * 5)
  const blogLength = Math.ceil(blogs.length / 5)
  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    dispatch(initUser())
  }, [])
  useEffect(() => {
    usersService.getUsers()
      .then(data => {
        setUsers(data)
      })
  }, [])
  
  const matchBlog = useMatch('/blogs/:id')
  const match = useMatch('/users/:id')
  const userDetail = match 
    ? users.find(user => user.id === match.params.id)
    : null
  const blogDetail = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null
  
  const handlePage = (e, value) => {
    setPage(value)
  }

  const handleLogout = () => {
    dispatch(logOut())
    localStorage.removeItem('blogUser')
  }

  const createBlog = async (blog) => {   
    dispatch(addBlog(blog, user));
    dispatch(safeAction(`a new blog ${blog.title}`, 2))
    const newBlog = users.map(u => {
      if(u.username === user.username) {
        return {
          ...u,
          blogs: [...u.blogs, blog]
        }
      }
      return u
    })
    setUsers(newBlog)
  }
  
  const likeButton = async (blog) => {
    dispatch(addLike(blog))    
  }

  const removeBlog = async (blog) => {
    const id = blog.id;
    dispatch(removeFromBlog(id))
  }

  const blogList = () => {
    return (
      <>
        <Typography variant="h4" sx={{textAlign: 'center'}}>Blogs</Typography>
        <Togglable>
          <BlogForm createBlog={createBlog}
            title={title}
            author={author}
            url={url}
            handleTitle={e => setTitle(e.target.value)}
            handleAuthor={e => setAuthor(e.target.value)}
            handleUrl={e => setUrl(e.target.value)}/>
        </Togglable>
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableBody>   
              {pagination.map(blog =>
                <BlogList key={blog.id} blog={blog}/>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination count={blogLength} page={page} onChange={handlePage} size='large'/>
      </>
    )
  }
  const renderLink = () => (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <BookIcon />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            BlogList
          </Typography>
          <Button color='inherit' component={Link} to='/'>blogs</Button>
          <Button color='inherit' component={Link} to='/users'>users</Button>
          {user 
            ? <div><span style={{ color: 'yellow' }}>{user.name} logged in</span> 
              <Button color='inherit' component={Link} to='/' onClick={handleLogout}>logout
              </Button>
            </div>
            : <Button color='inherit' component={Link} to='/register'>register</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  )
  return (
    <>
      {renderLink()}<br />
      <Notification showAlert={showAlert}/>
      <div style={{margin: '20px'}}>
      <Routes>
        <Route path='blogs/:id' 
          element={blogDetail 
            ? <Blog blog={blogDetail} addLike={likeButton} removeBlog={removeBlog} user={user}/>
            : <Navigate to='/' />}/>
        <Route path='users/:id' element={<UserDetail user={userDetail}/>} />
        <Route path='users' element={<Users users={users} />} />
        <Route path='/' element={user!==null ? blogList() : <LoginForm />} />
        <Route path='register' 
          element={!user 
            ? <Register addUser={(user) => setUsers(users.concat(user))} /> 
            : <Navigate to='/' />} />
      </Routes>
      </div>
    </>
  )
}

export default App