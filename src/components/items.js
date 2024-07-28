import React, { useState } from 'react';
import { Container, Grid, Paper, IconButton, TextField, Select, MenuItem } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';

const AddItems = ({ items, onDelete, onUpdate }) => {
  return (
    <Container>
      <div className="tasks" style={{ overflow: 'hidden' }}>
        <Grid container spacing={1.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <TaskItem
                item={item}
                onDelete={onDelete}
                onUpdate={(updatedItem) => onUpdate(index, updatedItem)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

const TaskItem = ({ item, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskDetails, setTaskDetails] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      onUpdate(taskDetails);
    }
    setIsEditing(!isEditing);
  };

  return (
    <Paper
      elevation={4}
      style={{
        // textAlign: 'center',
        height: '200px',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'center',
        padding: '1em',
        
      }}
    >
      {isEditing ? (
        <>
          <TextField
            name="task"
            label="Task Description"
            value={taskDetails.task}
            onChange={handleChange}
            fullWidth
            margin="normal"
            style={{ outline: 'none' }}
          />
          <Select
            name="priority"
            value={taskDetails.priority}
            onChange={handleChange}
            fullWidth
            margin="normal"
            style={{ outline: 'none' }}
          >
            <MenuItem value="High" style={{ backgroundColor: 'red' }}>High</MenuItem>
            <MenuItem value="Medium" style={{ backgroundColor: 'yellow' }}>Medium</MenuItem>
            <MenuItem value="Low" style={{ backgroundColor: 'blue' }}>Low</MenuItem>
          </Select>
          <TextField
            name="dueDate"
            type="date"
            value={taskDetails.dueDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            style={{ outline: 'none'}}
          />
        </>
      ) : (
        <>
          <div className="task" >{taskDetails.task}</div>
          <div className="priority" style={{border: '2px solid red'}}>{taskDetails.priority}</div>
          <div className="dueDate">{taskDetails.dueDate}</div>
        </>
      )}
      <div style={{ position: 'absolute', top: -7, right: 0 }}>
        <IconButton onClick={toggleEdit} style={{ color: isEditing ? 'green' : 'blue' }}>
          {isEditing ? <SaveIcon /> : <EditIcon />}
        </IconButton>
        {onDelete && (
          <IconButton onClick={() => onDelete(taskDetails.id)} style={{ color: 'red' }}>
            <DeleteIcon />
          </IconButton>
        )}
      </div>
    </Paper>
  );
};

export default AddItems;