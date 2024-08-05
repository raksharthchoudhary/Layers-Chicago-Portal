import React, { useEffect }  from 'react';
import { Menu, MenuItem } from '@mui/material';

const UserMenu = ({ anchorEl, onClose, onProfile, onTasks}) => {
    useEffect(() => {
        const handleDocumentClick = (event) => {
          if (anchorEl && !anchorEl.contains(event.target)) {
            onClose();
          }
        };
    
        document.addEventListener('mousedown', handleDocumentClick);
        return () => {
          document.removeEventListener('mousedown', handleDocumentClick);
        };
      }, [anchorEl, onClose]);
    
    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
      >
        <MenuItem onClick={onProfile}>
          Profile
        </MenuItem>
        <MenuItem onClick={onTasks}>
          Tasks
        </MenuItem>
      </Menu>
    );
  };

export default UserMenu;