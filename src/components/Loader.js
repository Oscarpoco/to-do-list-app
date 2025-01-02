import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      width="2rem" 
      height="2rem" 
    >
      <CircularProgress 
        style={{ color: '#fff', width: '1.5rem', height: '1.5rem' }} 
        thickness={5} 
      />

    </Box>
  );
};

export default Loader;
