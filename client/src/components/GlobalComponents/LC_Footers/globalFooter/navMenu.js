import React from 'react';
import drawerStyles from './navMenu.module.scss';
import { useNavigate } from 'react-router-dom';

import { Drawer,
         Button,
         StyledEngineProvider,
 } from '@mui/material';

import { Home as HomeIcon, 
         Group as GroupIcon,
         Check as CheckIcon,
         Logout as LogoutIcon,
         Settings as SettingsIcon,
         Inventory as InventoryIcon,
         EventNote as EventNoteIcon,
         AttachMoney as AttachMoneyIcon, 
         Notifications as NotifactionIcon
} from '@mui/icons-material';
import { Box } from '@mui/system';

export default function SideMenu({open, onClose}) {

  const navigate = useNavigate();

  return (
    <StyledEngineProvider injectFirst>
      <Drawer 
        classes={{
          modal: drawerStyles.overlay,
          paperAnchorLeft: drawerStyles.navMenu,
        }}
        anchor='left' 
        open={open} 
        onClose={onClose}>
          <Box className={drawerStyles.topList}>
            <Button 
              className={drawerStyles.topButtons}
              startIcon={<HomeIcon className={drawerStyles.topButtonIcons}/>}
              onClick={() => navigate('/home')}>
              Home
            </Button>
            <Button 
              className={drawerStyles.topButtons}
              startIcon={<AttachMoneyIcon className={drawerStyles.topButtonIcons}/>}>
              Sales
            </Button>
            <Button 
              className={drawerStyles.topButtons}
              startIcon={<InventoryIcon className={drawerStyles.topButtonIcons}/>}>
              Inventory
            </Button>
            <Button 
              className={drawerStyles.topButtons}
              startIcon={<EventNoteIcon className={drawerStyles.topButtonIcons}/>}>
              Schedule
            </Button>
            <Button 
              className={drawerStyles.topButtons}
              startIcon={<GroupIcon className={drawerStyles.topButtonIcons}/>}
              onClick={() => navigate('/customers')}>
              Customers
            </Button>
          </Box>
          <Box className={drawerStyles.bottomList}>
            <Button 
              className={drawerStyles.bottomButtons}
              startIcon={<NotifactionIcon className={drawerStyles.bottomButtonIcons}/>}>
              notifications
            </Button>
            <Button 
              className={drawerStyles.bottomButtons}
              startIcon={<CheckIcon className={drawerStyles.bottomButtonIcons}/>}>
              tasks
            </Button>
            <Button 
              className={drawerStyles.bottomButtons}
              startIcon={<LogoutIcon className={drawerStyles.bottomButtonIcons}/>}>
              logout
            </Button>
          </Box>
      </Drawer>
    </StyledEngineProvider>
  );
}