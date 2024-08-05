import React from 'react';
import styles from './index.module.scss';
import SearchBar from './searchBar';

import {
  Box,
  AppBar,
  Typography,
  StyledEngineProvider,
} from '@mui/material';

const HomeHeader = () => {

  return (
    <StyledEngineProvider injectFirst>
      <AppBar className={styles.appBar}>
        <SearchBar/>
        <Box className={styles.textBox}>
          <Typography className={styles.userName}>
            raj
          </Typography>
          <Typography className={styles.layersChi}>
            @LayersChicago
          </Typography>
        </Box>
      </AppBar>
    </StyledEngineProvider>
  );
};

export default HomeHeader;