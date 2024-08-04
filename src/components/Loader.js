// Loader.jsx
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LuListTodo } from "react-icons/lu";

const Loader = () => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="90vh"

    >
      <CircularProgress style={{color: 'red'}}/>
      <Typography variant="h6" component="div" marginTop={2}>
        <div className='logo'>
        <h3>Lis<span>tify</span><LuListTodo className='icon' /></h3>
        </div>
      </Typography>
    </Box>
  );
};

export default Loader;
