import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {InputBase } from '@mui/material';
import '@/styles/header.scss'

interface searchBarProps {
  onSearchInputChange: (searchValue: string) => void;
  searchDelay: number;
}

function SearchBar({onSearchInputChange, searchDelay}: searchBarProps) {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      onSearchInputChange(searchText);
    }, searchDelay);

    return () => clearTimeout(searchTimer);
  }, [setSearchText, searchText, onSearchInputChange, searchDelay]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="search">
      <div className="searchIconWrapper">
        <SearchIcon htmlColor="#011a5f" />
      </div>
      <InputBase
        className="inputBase"
        placeholder="Search…"
        onChange={handleChange}
        onSubmit={handleChange}
        value={searchText}
        font-color="action"
        fullWidth={true}
      />
    </div>
  );
}

export default SearchBar;
