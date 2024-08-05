import * as React from 'react';
import Styles from './messages.module.scss';
import Box from '@mui/material/Box';
import { AppBar, IconButton, Typography, Toolbar, StyledEngineProvider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Message ({ openMessage, messageType, messageText}){
    
    return(
        <StyledEngineProvider injectFirst>
        <Dialog open={openMessage} className={Styles[`${messageType}`]}>
            <AppBar className={Styles[`${messageType}`+'-header']}>
                    <Toolbar className={Styles[`${messageType}`+'-header-buttons']}>
                        <Typography align='left' sx={{ fontSize: '1.2rem', padding: '8px', flexGrow: 1 }}>
                            {messageType}!
                        </Typography>
                        <IconButton>
                            <CancelIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            <DialogContent>
                <Box className={Styles[`${messageType}`+'-body']}>
                    <Typography>
                        {messageText}
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
        </StyledEngineProvider>
    );
}