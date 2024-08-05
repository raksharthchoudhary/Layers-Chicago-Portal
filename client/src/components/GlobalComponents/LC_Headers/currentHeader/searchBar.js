import React, { useState } from 'react';
import formStyles from './searchBar.module.scss';

import { Search as SearchIcon } from '@mui/icons-material';

import { 
    OutlinedInput,
    StyledEngineProvider,
    InputAdornment,
} from '@mui/material';

export default function SearchBar({pageTitle}) {
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    // You can add your search logic here
  };

  return (
    <StyledEngineProvider injectFirst>
        <OutlinedInput
            classes={{
                root: formStyles.searchBar,
                input: formStyles.textContainer,
                notchedOutline: formStyles.highlightContainer}}
            endAdornment={
                <InputAdornment 
                    position='end'>
                    <SearchIcon/>
                </InputAdornment>}
            placeholder='"Search" ${pageTitle}'
            value={searchText}
            onChange={handleSearchChange}/>
    </StyledEngineProvider>
  );
}