import { Typography, Paper, Card, CardMedia, CardContent } from '@mui/material'
import { Link } from 'react-router-dom'

const UserDetail = ({user}) => {
  console.log(user)
  if(!user) {
    return null
  }
  return (
    // <Paper elevation={2}>
    // <div className='user-detail'>
    //   <Typography variant="h5" fontWeight="bold">{user.name}</Typography> <br />
    //   <img src={user.image}/>
    //   <Typography variant="h6">Added blogs</Typography>
    //   <ul>
    //     {user.blogs.map(b => (
    //       <li key={b.title}><Typography variant="body1" component={Link} to={`/blogs/${b.id}`}>{b.title}</Typography></li>
    //     ))}
    //   </ul>
    // </div>
    <div className='user-detail'>
    <Card sx={{ width: 700, maxWidth: 900 }}>
      <CardMedia
        component="img"
        alt="okkk"
        height="240"
        image={user.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontWeight='bold' sx={{textAlign: 'center'}}>
         {user.name}
        </Typography>
        <Typography variant="h6">Added blogs</Typography>
      <ul>
        {user.blogs.map(b => (
          <li key={b.title}>
            <Typography variant="body1" sx={{mb: 4}} component={Link} to={`/blogs/${b.id}`}>
              {b.title}
            </Typography>
          </li>
        ))}
      </ul>
      </CardContent>
    </Card>
    </div>
    // </Paper>
  )
}

export default UserDetail