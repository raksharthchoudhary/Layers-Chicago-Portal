import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import SalesTable from './salesInfo';
import StockTable from './stockInfo';
import LoyaltyTable from './loyaltyInfo';
import HomeHeader from '../LC_Headers/homeHeader'; 

import {
    Box,
    Button,
    IconButton,
    Paper,
    StyledEngineProvider, 
    Typography
} from '@mui/material';

import { 
    Notifications as NotifactionIcon,
    Inventory as InventoryIcon,
    AttachMoney as AttachMoneyIcon, 
    EventNote as EventNoteIcon,
    Check as CheckIcon,
    Group as GroupIcon,
    Logout as LogoutIcon,
    History as HistoryIcon, 
    Settings as SettingsIcon,
} from '@mui/icons-material';


const Home = () => {

    const [token, setToken] = useState(() => sessionStorage.getItem('token'));

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenParam = params.get('token');

        console.log('URL Parameters:', params.toString()); // Log all URL parameters
        console.log('Extracted token:', tokenParam); // Log the extracted token

      if (tokenParam) {
        sessionStorage.setItem('token', tokenParam);
        // Redirect to a clean URL without the token
        navigate('/home', { replace: true });
      } else if (!sessionStorage.getItem('token')) {
        console.log('No token found, navigating to /login');
        navigate('/login', { replace: true });
    }
    }, [location, navigate]);

    return(
        <StyledEngineProvider injectFirst>
        <div className={styles.background}/>
        <HomeHeader/>
        <div className={styles.pageContainer}>
            <div className={styles.containerOne}>
                <Paper className={styles.infoCard}>
                    <Box className={styles.header}>
                        <Button 
                        className={styles.buttons}
                        startIcon={<AttachMoneyIcon className={styles.icons}/>}>
                            Transactions
                        </Button>
                        <Button 
                        className={styles.buttons}
                        startIcon={<GroupIcon className={styles.icons}/>}>
                            Customers
                        </Button>
                        <Button 
                        className={styles.buttons}
                        startIcon={<InventoryIcon className={styles.icons}/>}>
                            Inventory
                        </Button>
                        <Button 
                        className={styles.buttons}
                        startIcon={<EventNoteIcon className={styles.icons}/>}>
                            Schedule
                        </Button>
                    </Box>
                    <Box className={styles.footer}>
                        <Button 
                        className={styles.buttons}
                        startIcon={<NotifactionIcon className={styles.icons}/>}>
                            notifications
                        </Button>
                        <Button 
                        className={styles.buttons}
                        startIcon={<SettingsIcon className={styles.icons}/>}>
                            settings
                        </Button>
                        <Button 
                        className={styles.buttons}
                        startIcon={<LogoutIcon className={styles.icons}/>}>
                            logout
                        </Button>
                    </Box>
                </Paper> 
            </div>
            <div className={styles.containerTwo}>
                <Paper className={styles.infoCard}>
                    <Box className={styles.header}>
                        <Typography className={styles.headerTitle}>
                             Sale Numbers
                        </Typography>
                    </Box>
                    <SalesTable/>
                    <Box className={styles.header}>
                        <Typography className={styles.headerTitle}>
                            Loyalty Members
                        </Typography>
                    </Box>
                    <LoyaltyTable/>
                    <Box className={styles.header}>
                        <Typography className={styles.headerTitle}>
                            Current Stock
                        </Typography>
                    </Box>
                    <StockTable/>
                </Paper>
                <Paper className={styles.infoCardTwo}>
                    <Box className={styles.header}>
                        <IconButton>
                            <HistoryIcon fontSize='large'/>
                        </IconButton>
                        <Typography className={styles.headerTitle}>
                            Assigned Tasks*
                        </Typography>
                    </Box>
                    <Box className={styles.list}>
                        <Box className={styles.item}>
                            <IconButton className={styles.checkBox} disableRipple={true}>
                                <CheckIcon fontSize='small'/>
                            </IconButton>
                            <Typography className={styles.title}>
                                Complete Task 1. 
                            </Typography>
                        </Box>
                        <Box className={styles.item}>
                            <IconButton className={styles.checkBox} disableRipple={true}>
                                <CheckIcon fontSize='small'/>
                            </IconButton>
                            <Typography className={styles.title}>
                                Complete Task 2. 
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </div>
        </div>
        </StyledEngineProvider>
    );
};

export default Home; 

/*
<Button 
className={styles.header}
disableRipple={true}>
    <Typography className={styles.headerTitle}>
        /transactions
    </Typography>
</Button>
<Button className={styles.header}
disableRipple={true}>
    <Typography className={styles.headerTitle}>
        /inventory
    </Typography>
</Button>
<Button className={styles.header}
disableRipple={true}
onClick={() => {navigate('/customers');}}>
    <Typography className={styles.headerTitle}>
        /customers
    </Typography>
</Button>
*/