import React, { useState } from 'react';

import {
  AppBar,
  Toolbar,
  ThemeProvider,
  Typography,
  IconButton,
} from '@mui/material';

import { AccountCircle as UserIcon } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';

import UserMenu from './userMenu';
import appTheme from '../appTheme';


const UserHeader = ({userFirstName, userButtons}) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={appTheme}>
      <AppBar position="static">
      <Toolbar>
        <Typography align='left' variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hey, {userFirstName}!
        </Typography>
        {userButtons}
        <IconButton onClick={handleMenuOpen} color="secondary">
          <UserIcon/>
        </IconButton>
        <IconButton color="secondary">
          <LogoutIcon/>
        </IconButton>
      </Toolbar>
    </AppBar>
    <UserMenu anchorEl={anchorEl} onClose={handleMenuClose}/>
    </ThemeProvider>
  );
};

export default UserHeader;