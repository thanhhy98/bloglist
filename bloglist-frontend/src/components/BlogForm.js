import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField, Button, Typography, Paper, Box, Grid } from '@mui/material';
import { addBlog } from '../reducers/blogsReducer';
import { dangerAction, safeAction } from '../reducers/noticeReducer';

const BlogForm = ({ usersHandle, users, user }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch()
  const handleCreateBlog = async (e) => {
    e.preventDefault()
    const blog = {
      title,
      author,
      url,
      likes: Math.floor(Math.random() * 100)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    try {
      await dispatch(addBlog(blog, user));
      const newBlog = users.map(u => {
        if(u.username === user.username) {
          return {
            ...u,
            blogs: [...u.blogs, blog]
          }
        }
        return u
      })
      dispatch(safeAction(`a new blog ${blog.title}`, 2))
      usersHandle(newBlog)
    } catch {
      dispatch(dangerAction(`a new blog ${blog.title} didnt created`, 2))
    }
  }

  return (
    <>        
      <form onSubmit={handleCreateBlog}>
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 200,
        },
      }}
    >
      <Grid container justify = "center">
      <Paper sx={{p: 3}} elevation={2}>
        <div>
        <Typography variant="h6" style={{marginLeft: '65px'}}>Create</Typography>
          <TextField variant="standard" label="title" 
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <TextField variant="standard" label="author"
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
          <TextField variant="standard" label="url"
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)} />
        </div>
        </Paper>
        </Grid>
      </Box>
        <Button variant="contained" sx={{mt: 1, ml: 10}} type="submit">Create</Button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  usersHandle: PropTypes.func.isRequired
}
export default BlogForm