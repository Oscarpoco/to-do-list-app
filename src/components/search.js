import React, { useState, useRef, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TbListSearch } from "react-icons/tb";

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
        <TbListSearch
          icon={TbListSearch}
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
    fontSize: '2rem',
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
