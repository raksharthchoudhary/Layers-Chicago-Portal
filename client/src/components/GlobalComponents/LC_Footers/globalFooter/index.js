import React, { useState } from 'react';
import styles from './index.module.scss';
import SideMenu from './navMenu';

import {
  Box,
  AppBar,
  IconButton,
  Typography,
  StyledEngineProvider,
} from '@mui/material';

import { 
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const GlobalFooter = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const handleNavMenu = () => {
    if(isNavMenuOpen){
      setIsNavMenuOpen(false);
    }
    else setIsNavMenuOpen(true);
  };

  return (
    <StyledEngineProvider injectFirst>
      <AppBar className={styles.appBar}>
        <Box className={styles.searchBox}>
        {isNavMenuOpen ? 
        <IconButton 
            className={styles.iconButton}
            onClick={handleNavMenu}>
            <CloseIcon/>
        </IconButton> :
        <IconButton 
            className={styles.iconButton}
            onClick={handleNavMenu}>
            <MenuIcon/>
        </IconButton>}
        </Box>
        <Box className={styles.textBox}>
          <Typography className={styles.userName}>
            raj
          </Typography>
          <Typography className={styles.layersChi}>
            @LayersChicago
          </Typography>
        </Box>
      </AppBar>
      <SideMenu
          open={isNavMenuOpen}
          onClose={() => setIsNavMenuOpen(false)}/>
    </StyledEngineProvider>
  );
};

export default GlobalFooter;