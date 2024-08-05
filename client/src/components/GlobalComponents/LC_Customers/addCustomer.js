import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LC_Theme from '../LC_Theme';
import { ThemeProvider } from '@mui/system';

export default function AddCustomer({ open, onClose, customer, onChange, onAdd }) {
    const handleInputChange = (e) => {
        onChange({
        ...customer,
        [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (name) => (date) => {
        onChange({
        ...customer,
        [name]: date,
        });
    };

    return (
        <Box>
        <ThemeProvider theme={LC_Theme}>
            <Dialog open={open} onClose={onClose}>
                <DialogContent>
                    <Box mt={2} mr={2} mb={2} ml={2}>
                        <TextField name="firstName" label="First Name*" value={customer.firstName} fullWidth onChange={handleInputChange} />
                    </Box>
                    <Box mt={2} mr={2} mb={2} ml={2}>
                        <TextField name="lastName" label="Last Name*" value={customer.lastName} fullWidth onChange={handleInputChange} />
                    </Box>
                    <Box mt={2} mr={2} mb={2} ml={2}>
                        <TextField name="phoneNumber" label="Phone Number*" value={customer.phoneNumber} fullWidth onChange={handleInputChange} />
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box mt={2} mr={2} mb={2} ml={2}>
                            <DatePicker
                                name="dob"
                                label="Date of Birth*"
                                value={customer.dob}
                                onChange={handleDateChange('dob')}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                        <Box mt={2} mr={2} mb={2} ml={2}>
                            <DatePicker
                                name="memberSince"
                                label="Member Since*"
                                value={customer.memberSince}
                                onChange={handleDateChange('memberSince')}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                    </LocalizationProvider>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
        </Box>
    );
}