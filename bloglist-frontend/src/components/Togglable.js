import { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Togglable = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const showVisible = { display: visible ? '' : 'none' };
  const hideVisible = { display: visible ? 'none' : '' };

  return (
    <>
      <div style={hideVisible}>
        <Button 
          variant="contained"
          startIcon={<AddIcon />} 
          onClick={() => setVisible(!visible)}>
          create new blog
        </Button>
      </div>
      <div style={showVisible}>
        {children}
        <Button variant="text" sx={{ml: 10}} onClick={() => setVisible(!visible)}> 
        cancel
        </Button>
      </div>
    </>
  )
}

export default Togglable;