import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Slide } from '@mui/material';

// Custom transition component for the Snackbar
const SlideTransition = (props) => {
  return <Slide {...props} direction="left" />;
};

const CustomizedSnackbars = ({ open, message, severity, onClose }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  // Custom styles for different severity levels
  const getAlertStyle = (severity) => {
    const baseStyle = {
      width: '100%',
      borderRadius: '8px',
      fontWeight: '500',
      fontSize: '0.95rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const severityStyles = {
      success: {
        backgroundColor: '#2e7d32',
        '& .MuiAlert-icon': {
          color: '#fff'
        }
      },
      error: {
        backgroundColor: '#d32f2f',
        '& .MuiAlert-icon': {
          color: '#fff'
        }
      },
      warning: {
        backgroundColor: '#ed6c02',
        '& .MuiAlert-icon': {
          color: '#fff'
        }
      },
      info: {
        backgroundColor: '#0288d1',
        '& .MuiAlert-icon': {
          color: '#fff'
        }
      }
    };

    return {
      ...baseStyle,
      ...severityStyles[severity]
    };
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={SlideTransition}
      sx={{
        '& .MuiSnackbar-root': {
          top: '24px'
        }
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={getAlertStyle(severity)}
        icon={severity !== 'success'}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbars;