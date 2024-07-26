import React from 'react';
import { Container, Grid, Paper, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const AddItems = ({ items, onDelete }) => {
  return (
    <Container >
      <div className="tasks" style={{overflow: 'hidden'}}>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Paper
                elevation={2}
                style={{ 
                  padding: 2, // Increase padding
                  textAlign: 'center',
                  // width: '50%',
                  height: '150px',
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'auto'
                }}
              >
                <div>{item.text}</div>
                {onDelete && (
                  <IconButton
                    onClick={() => onDelete(item.id)}
                    style={{ position: 'absolute', top: 0, right: 0, color: 'red'}}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default AddItems;
