// CurrentTime.js
import React, { useState, useEffect } from 'react';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.time}>{currentTime}</h2>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'inherit', 
  },
  time: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#00e676', 
  },
};

export default CurrentTime;
