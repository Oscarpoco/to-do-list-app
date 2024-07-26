import React from 'react';
import { Container, Grid, Paper } from '@mui/material';

const AddItems = ({ items }) => {
  return (
    <Container>
      <div className="tasks">
        <Grid container spacing={1.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper elevation={3} style={{ padding: 2, textAlign: 'center', width: '90%', height: '150px'}}>
                item {index + 1}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default AddItems;
