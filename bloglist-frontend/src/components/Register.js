import { useState } from 'react'
import userService from '../services/users'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { TextField, Button, Typography } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload';
import {storage} from '../firebase'

const Register = ({ addUser }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState(null)

  const dispatch = useDispatch()

  function handleChange(e) {
    if(e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  function handleUpload(image) {
    if(image) {
      return new Promise((resolve, reject) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
          'state_changed',
          snapshot => {},
          error => {
            reject(error)
          },
          async () => {
            const url = await storage
              .ref('images')
              .child(image.name)
              .getDownloadURL()
            if(url) {
              resolve(url)
            }
          }
        )
      })
    } else {
      return false
    }
  }

  async function handleRegister(e) {
    e.preventDefault()
    const result = await handleUpload(image)
    const user = {
      name,
      username,
      image: result,
      passwordHash: password
    }
    
    const newUser = await userService.addUser(user)
    if(newUser) {
      addUser(newUser)
      dispatch(login({ username, password }))
    }
  }

  return (
    <div className='center'>
      <form onSubmit={handleRegister}>
      <Typography variant="h5">Register</Typography>
        <div>
          <TextField label="name" variant="standard" size="small"
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <TextField label="username" variant="standard" size="small"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField label="password" variant="standard" size="small"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <div>
          <Button startIcon={<UploadIcon />} variant="contained" component="label" sx={{mb: 2, mt: 2}}
                  color='info'>
            {image ? 'done' : 'Upload avatar'}
            <input type="file" accept="image/*" hidden onChange={handleChange}/>
          </Button>
          </div>
        </div>
        <Button variant="contained" id="login" type="submit">NEXT</Button>
      </form>
    </div>
  )
}

export default Register