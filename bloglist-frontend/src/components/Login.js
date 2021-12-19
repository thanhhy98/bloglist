import { Typography, TextField, Button, Box } from "@mui/material"
import { useDispatch } from "react-redux";
import { useState } from 'react'
import { dangerAction } from "../reducers/noticeReducer";
import { login } from "../reducers/userReducer";
import { Link } from "react-router-dom";

 const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const handleLogin = async e => {
        e.preventDefault();
        const credentials = {
          username, 
          password
        }
        try {
          await dispatch(login(credentials))
        } catch {
          dispatch(dangerAction('wrong password or username', 3))
        }
      }
    return (
    <div className="center">
      <form onSubmit={handleLogin}>
      <Typography variant="h5" component="div" gutterBottom>log in to bloglist</Typography>
        <div>
          <TextField label="username" variant="standard" size="small"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <TextField label="password" variant="standard" size="small" 
            helperText=''
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Box sx={{mt: 3, pl: 2}}>
        <Button type="submit" variant='contained' id="login">login</Button>
        <Button component={Link} to='register'>Register</Button>
        </Box>
      </form>
    </div>
  )
}

export default LoginForm
