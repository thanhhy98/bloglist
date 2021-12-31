import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment, addLike } from '../reducers/blogsReducer';
import {TableRow, TableCell, Typography, Grid,
   Button, TextField, IconButton, Paper} from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const BlogList = ({ blog }) => {
  const [like, setLike] = useState(false);

  const dispatch = useDispatch()
  const likeButton = async (blog) => {
    const num = like ? -1 : 1;
    const newwBlog = {
      ...blog,
      likes: blog.likes + num
    }
    dispatch(addLike(newwBlog))  
    setLike(!like)  
  }

  return (
    <TableRow>
      <TableCell sx={{fontSize: '17px', p: 3.3}}>
      <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>{blog.title}</Link>
      </TableCell>
      <TableCell sx={{fontSize: '17px'}}>
        {blog.author}
      </TableCell>
      <TableCell sx={{fontSize: '17px'}}>
        {blog.likes}
        <IconButton variant="contained" size="medium" color="primary"
        id="like" onClick={()=>likeButton(blog)}>
        {like 
        ? <ArrowDownwardIcon fontSize='inherit' color='error'/>
        : <ArrowUpwardIcon  fontSize='inherit'/>}
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
export const Blog = ({ blog, removeBlog, user }) => {
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState('')
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const handleRemove = async (blog) => {
    const confim = window.confirm(`Are you sure to remove ${blog.title} by ${blog.author}?`)
    if(confim) {
      await removeBlog(blog)
    }
  }

  const handleAddLikes = async (blog) => {
    const num = like ? -1 : 1;
    const newBlog = {
      ...blog,
      likes: blog.likes + num
    }
    dispatch(addLike(newBlog))  
    setLike(!like)
  }
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    dispatch(addComment(comment, blog.id))
    setComment('')
  }
  const extendBlog = () => (
    <div className='detail'>
      <Typography variant="h5" fontWeight="bold">{blog.title}</Typography>
      <Typography variant="h6">by {blog.author}</Typography>
      <Typography variant="h6"><a href={blog.url}>{blog.url}</a></Typography>
      <Typography variant="body1">
        {blog.likes} upvotes 
        <IconButton variant="contained" size="medium" color="primary"
        id="like" onClick={() => handleAddLikes(blog)}>
        {like 
        ? <ArrowDownwardIcon fontSize='inherit' color='error'/>
        : <ArrowUpwardIcon  fontSize='inherit'/>}
        </IconButton>
      </Typography>
      <Typography variant="body1">added by {blog.user?.name}</Typography>
      <br />
      {user?.name === blog.user?.name 
        && <Button variant="contained" size="small" color="error"
            onClick={async() => await handleRemove(blog)}>
            remove
           </Button>}
    </div>
  )
  if(!blog) {
    return null
  }

  const order = blog ?  blog.comments.slice().reverse() : null
  const showAll = show ?  order : order.slice(0, 3)
  return (
    <div className='blog'>
    <Paper elevation={2}>
      {extendBlog()}
    </Paper>
      <Typography variant="h6">Comments</Typography>
      <form onSubmit={handleSubmitComment}>
        <TextField variant='filled' placeholder='share your thought' sx={{width: '100ch'}} multiline rows={2}
         value={comment} 
         onChange={e=>setComment(e.target.value)}/>
        <Button startIcon={<CommentIcon />} size="medium" sx={{height: '6ch'}} variant="contained" type="submit">
          add
        </Button>
      
      </form>
      <ul className='comments'>
        {showAll.map(c => (
          <li key={c.id}>
          <img src={c.image} className='avatar'/>
          <div>
          <div>
          <Link to={`/users/${c.user}`} id='img-comment'>
          <strong>{c.username}</strong>
          </Link> 
          </div>   
          <Typography variant="body1">{c.comment}</Typography>
          </div>
        </li>)
        )}
      </ul>
      {blog.comments.length > 5 && 
      <Grid container justify = "center">
        <Button size="small" variant="contained" onClick={()=>setShow(!show)} sx={{ mx: "auto", width: 200 }}>
          {show ? 'show less' : 'show all'}
        </Button>
      </Grid>}
    </div>  
  )
}