const Notification = ({ showAlert }) => {
  if(showAlert.notification===null) {
    return null
  }
  return (
    <>
      <h1 className={showAlert.state==='danger' ? 'danger': 'safe'}>{showAlert.notification}</h1>
    </>
  )
    
}

export default Notification;