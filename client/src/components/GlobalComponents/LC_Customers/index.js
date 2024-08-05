import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.scss';

import GlobalFooter from '../LC_Footers/globalFooter';
import CurrentHeader from '../LC_Headers/currentHeader';
//import AddCustomer from './addCustomer';

import { //Box,
         //Button, 
         StyledEngineProvider,
       } from '@mui/material';
/*import { AddCircle,
         DeleteRounded,
         CancelRounded,
       } from '@mui/icons-material';*/

import { DataGrid } from '@mui/x-data-grid/DataGrid';
//import LoadingButton from '@mui/lab/LoadingButton';
//import AddIcon from '@mui/icons-material/Add';
//import DeleteIcon from '@mui/icons-material/Delete';
//import CancelIcon from '@mui/icons-material/Cancel';

const initialRows = [
  {id: uuidv4(), firstName: 'Blake', lastName: 'Swanson', email: 'blake.swanson@layerschi.com', phoneNumber: '+1 (312) 909-2146', dob: '12/30/1998', credits: '2500', lastPurchaseDate: '05/14/2024', memberSince: '05/01/2024'},
  {id: uuidv4(), firstName: 'Raksharth', lastName: 'Choudhary', email: 'raks.chow@layerschi.com', phoneNumber: '+1 (402) 890-1595', dob: '09/06/1997', credits: '1800', lastPurchaseDate: '05/11/2024', memberSince: '05/03/2024'},
  {id: uuidv4(), firstName: 'Robert', lastName: 'Griffel', email: 'robert.griffel@gmail.com', phoneNumber: '+1 (402) 812-1332', dob: '10/11/1998', credits: '800', lastPurchaseDate: '05/12/2024', memberSince: '05/08/2024'},
  {id: uuidv4(), firstName: 'Trent', lastName: 'Totusek', email: 'trent.totusek@gmail.com', phoneNumber: '+1 (386) 492-8575', dob: '05/13/1998', credits: '4200', lastPurchaseDate: '05/10/2024', memberSince: '05/05/2024'},
];

export default function CustomerInfo() {
  const [rows, setRows] = useState(initialRows);
  //const [selectedRows, setSelectedRows] = useState([]);
  //const [isDeleteMode, setIsDeleteMode] = useState(false);
  //const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  //const [loading, setLoading] = useState(false);
  /*const [newCustomer, setNewCustomer] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dob: null,
    memberSince: null,
  });*/

  const columns = [
    { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 160},
    { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 160},
    { field: 'dob', headerName: 'Date of Birth', flex: 1, minWidth: 120},
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 1.5, minWidth: 160},
    { field: 'email', headerName: 'E-Mail', flex: 3, minWidth: 320},
    { field: 'credits', headerName: 'Loyalty Credits', flex: 1, minWidth: 80},
    { field: 'lastPurchaseDate', headerName: 'Last Purchase', flex: 1, minWidth: 120},
    { field: 'memberSince', headerName: 'Member Since', flex: 1, minWidth: 120}
  ];

  /* const handleAddCustomer = () => {
    const newRow = {
      id: uuidv4(),
      ...newCustomer,
      rewardPoints: '0',
      lastPurchaseDate: 'Invalid',
    };

    setRows(prevRows => [...prevRows, newRow]);
    setIsAddCustomerOpen(false);
  };

  const handleDeleteRows = () => {
    setLoading(true);
    setRows(rows.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    setIsDeleteMode(false);
  }; */

  return (
    <StyledEngineProvider injectFirst>
      <CurrentHeader pageTitle={'/customers'}/>
      <DataGrid
        classes={{
          root: styles.grid,
          row: styles.row,
          cell: styles.cell,
          columnHeader: styles.columnHeader,
          footerContainer: styles.footerContainer,
          columnHeaderTitle: styles.columnHeaderTitle
        }}
        rows={rows}
        columnHeaderHeight={52}
        rowHeight={45}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection={false}
        disableRowSelectionOnClick={true}
        /*onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection.selectionModel);
        }}*/
      />
      <GlobalFooter/>
    </StyledEngineProvider>
  );
}

/*
<Box mt={2} mr={2} mb={2} ml={2}>
  <Button
    variant="contained"
    classes={{
      contained: buttonStyles.add,
    }}
    onClick={() => setIsAddCustomerOpen(true)}
    startIcon={<AddCircle/>}
  >
    ADD
  </Button>
  {isDeleteMode ? 
    ((selectedRows.length === 0) ?
      <Button
        variant="contained"
        classes={{
          contained: buttonStyles.cancel,
        }}
        onClick={() => {setSelectedRows([]); setIsDeleteMode(false)}}
        endIcon={<CancelRounded/>}
      >
        CANCEL
      </Button> : <LoadingButton
        variant="contained"
        classes={{
          contained: buttonStyles.delete,
        }}
        onClick={handleDeleteRows}
        endIcon={<DeleteRounded/>}
        loading={loading}
        loadingPosition="end"
      >
        DELETE SELECTED
      </LoadingButton>
    ):<Button
        variant='contained'
        classes={{
          contained: buttonStyles.delete,
        }}
        onClick={() => setIsDeleteMode(true)}
        endIcon={<DeleteRounded/>}
      >
        DELETE
      </Button>
  }
</Box>
<AddCustomer
  open={isAddCustomerOpen}
  onClose={() => setIsAddCustomerOpen(false)}
  customer={newCustomer}
  onChange={setNewCustomer}
  onAdd={handleAddCustomer}
/>
*/