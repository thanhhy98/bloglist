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
import { initBlogs, removeFromBlog } from './reducers/blogsReducer';
import { logOut, initUser } from './reducers/userReducer';
import Register from './components/Register';
import { Table, TableContainer, TableBody, Paper, Button,
     Toolbar, Typography, AppBar, Box, Pagination, TextField, InputBase } from '@mui/material';
import { Routes, Route, useMatch, Link, Navigate } from 'react-router-dom'
import BookIcon from '@mui/icons-material/Book';
import SearchIcon from '@mui/icons-material/Search';
import LoginForm from './components/Login';
import DropDown from './components/DropDown';
import {styled, alpha} from '@mui/material/styles'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: '10px',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const App = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()
  const showAlert = useSelector(state => state.showAlert)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  if(user) {
    blogService.setToken(user.token)
  }
  console.log(blogs)
  const sortByLikes = blogs.slice().sort((blog1, blog2) => blog2.likes - blog1.likes)
  const pagination = sortByLikes.slice((page - 1) * 5, page * 5)
  const blogLength = Math.ceil(blogs.length / 5)
  const searchedBlogs = search 
    ? blogs.filter(blog => {
      let s = search.toLowerCase().split('')
      let b = blog.title.split('')
      let result = ''
      b.forEach((item, index) => {
        if(item.toLowerCase().localeCompare(s[index], 'en', {sensitivity: 'base'}) === 0) {
          if(s[index]) {
            result += s[index]
          }
        }   
      })
      if(result.toLowerCase() === search.toLowerCase()) {
        return true
      } else {
        return false
      }
    }) 
    : null

  console.log(searchedBlogs)
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


  const removeBlog = async (blog) => {
    const id = blog.id;
    dispatch(removeFromBlog(id))
  }

  const blogList = () => {
    return (
      <>
        <Typography variant="h4" sx={{textAlign: 'center'}}>Blogs</Typography>
        <Togglable>
          <BlogForm users={users}
                    user={user}
                    usersHandle={a => setUsers(a)}
          />
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
          <div className='dropdown'>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Search>
          {/* <TextField variant='filled' label="Search"
            type="text"
            autoComplete='off'
            value={search}
            onChange={e => setSearch(e.target.value)} /> */}
            <DropDown blogs={searchedBlogs} handleSearch={() => setSearch('')}/>
          </div>
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
            ? <Blog blog={blogDetail} removeBlog={removeBlog} user={user}/>
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