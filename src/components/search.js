import React, { useState, useRef, useEffect } from 'react';
import { TbListSearch } from "react-icons/tb";

const SearchInput = ({ searchTasks }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);

  const handleIconClick = () => {
    setIsSearchVisible(true);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchVisible(false);
      setSearchTerm(""); // Clear search term when clicking outside
      searchTasks(""); // Reset the task list
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    searchTasks(event.target.value);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} style={styles.container}>
      {isSearchVisible ? (
        <input 
          type="text" 
          id="search" 
          placeholder="Search task by keyword" 
          style={styles.input} 
          value={searchTerm}
          onChange={handleChange}
        />
      ) : (
        <TbListSearch
          onClick={handleIconClick}
          style={styles.icon}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    position: 'relative',
    width: '100%', 
    height: '50%', 
  },
  icon: {
    fontSize: '1.8rem',
    cursor: 'pointer',
    color: 'black',
  },
  input: {
    width: '70%',
    height: '100%',
    padding: '9px 0',
    fontSize: '.7rem',
    position: 'absolute',
    right: '60px'
  },
};

export default SearchInput;
