import React from 'react';
import classes from "./SearchBar.module.css";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className={classes.header_middle}>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={onSearch}
      />
      <SearchIcon className={classes.searchIcon} />
    </div>
  );
};

export default SearchBar;
