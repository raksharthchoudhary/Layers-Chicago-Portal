import React from 'react';
import styles from './index.module.scss';
import SearchBar from './searchBar';

import {
  Box,
  AppBar,
  Typography,
  StyledEngineProvider,
  Toolbar,
  IconButton,
} from '@mui/material';

//import AddIcon from '@mui/icons-material/Add';
//import DeleteIcon from '@mui/icons-material/Delete';

function CurrentHeader({ pageTitle, onAddClick }) {
  return (
    <StyledEngineProvider injectFirst>
      <AppBar className={styles.appBar}>
        <Box className={styles.titleBox}>
          <Typography className={styles.title}>
            {pageTitle}
          </Typography>
        </Box>
        <Box className={styles.searchContainer}>
          <SearchBar pageTitle={pageTitle} />
        </Box>
      </AppBar>
    </StyledEngineProvider>
  );
};

export default CurrentHeader;

/*
<Toolbar className={styles.componentBar}>
  <IconButton className={styles.addButton} onClick={onAddClick}>
    <AddIcon />
  </IconButton>
  <IconButton className={styles.deleteButton}>
    <DeleteIcon />
  </IconButton>
</Toolbar>
*/