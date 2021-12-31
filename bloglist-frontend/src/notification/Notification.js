import Alert from '@mui/material/Alert';

const Notification = ({ showAlert }) => {
  if(showAlert.notification===null) {
    return null
  }
  return (
    <>
      <Alert severity={showAlert.state==='danger' ? 'error': 'success'} 
            sx={{ position: 'absolute', width: '100%', top:60}}>
        {showAlert.notification}
      </Alert>
    </>
  )
    
}

export default Notification;