import React, { useState } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    IconButton, 
    TextField 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import GlobalHeader from '../../GlobalComponents/GlobalHeader'
import { Container } from '@mui/system';
import appTheme from '../appTheme';

const UserInfoTable = ({ userData }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <Container>
        <GlobalHeader title='User Profile' showAdditionalButtons={(
            <IconButton onClick={handleEditClick}>
            {isEditMode ? <SaveIcon sx={{ color: appTheme.palette.info.dark }}/> : <EditIcon sx={{ color: appTheme.palette.error.main }}/>}
            </IconButton>
        )}/>
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            </TableHead>
            <TableBody>
            {Object.keys(editedData).map((field) => (
                <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>
                    {isEditMode ? (
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={editedData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                    />
                    ) : (
                    editedData[field]
                    )}
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Container>
  );
};

// Example usage:
const initialUserData = {
    'User Id': 'jDoe',
    'First Name': 'John',
    'Last Name': 'Doe',
    'E-Mail Id': 'john.doe@example.com',
    'Phone Number': '+1-(402)-890-1595',

  // Add more fields here
};

export default function App() {
  return (
    <div>
      <UserInfoTable userData={initialUserData} />
    </div>
  );
}