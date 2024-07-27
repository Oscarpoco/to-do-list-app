import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchInput = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef(null);

  const handleIconClick = () => {
    setIsSearchVisible(true);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchVisible(false);
    }
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
        <input type="text" id="search" placeholder="Search" style={styles.input} />
      ) : (
        <FontAwesomeIcon
          icon={faSearch}
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
    width: '70%', 
    height: '30%', 
  },
  icon: {
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    height: '100%',
    padding: '5px',
    fontSize: '.7rem',
  },
};

export default SearchInput;
