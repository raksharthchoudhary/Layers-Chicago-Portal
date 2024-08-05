import React, { useState, useEffect, useCallback } from 'react';
import styles from './index.module.scss';

import GlobalFooter from '../LC_Footers/globalFooter';
import CurrentHeader from '../LC_Headers/currentHeader';
import AddInventoryItem from './addItem';

import { Box, Toolbar, IconButton, StyledEngineProvider } from '@mui/material';

import { DataGrid, GridFooterContainer, GridPagination, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Inventory() {
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState({});
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchData = useCallback(() => {
    fetch('http://localhost:5000/inventory-items')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Log fetched data

        // Transform the data to match the format expected by DataGrid
        const transformedRows = data.map(item => {
          const row = {
            id: item._id,
            itemName: item.name,
            category: item.category,
            sku: item.sku,
            brand: item.brand,
            color: item.color,
            material: item.material,
            size: item.size,
            price: item.price,
            itemCost: item.itemCost, // Include itemCost
            buyMethod: item.buyMethod, // Include buyMethod
            units: item.units,
            daysInStock: item.daysInStock,
            daysOnFloor: item.daysOnFloor,
            daysInBack: item.daysInBack,
            dateAdded: item.dateAdded,
          };

          // Store the original row values
          originalRows[item._id] = { ...row };

          return row;
        });

        console.log('Transformed data:', transformedRows); // Log transformed data
        setRows(transformedRows);
        setOriginalRows(originalRows);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, [originalRows]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddItemClick = () => {
    setAddItemOpen(true);
  };

  const handleAddItemClose = (newItem) => {
    setAddItemOpen(false);
    setSelectedRow(null);
    if (newItem) {
      // If a new item is added, fetch the updated data
      fetchData();
    }
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setAddItemOpen(true);
  };

  const columns = [
    { field: 'dateAdded', headerName: 'Date Added', flex: 1.5, minWidth: 120 },
    { field: 'sku', headerName: 'SKU', flex: 1.5, minWidth: 120 },
    { field: 'itemName', headerName: 'Name', flex: 3, minWidth: 240 },
    { field: 'category', headerName: 'Category', flex: 1.5, minWidth: 120 },
    { field: 'brand', headerName: 'Brand', flex: 2, minWidth: 160 },
    { field: 'color', headerName: 'Color', flex: 1, minWidth: 80 },
    { field: 'size', headerName: 'Size', flex: 1, minWidth: 80 },
    { field: 'price', headerName: 'Price', flex: 1, minWidth: 80, type: 'number' },
    { field: 'itemCost', headerName: 'Item Cost', flex: 1, minWidth: 80, type: 'number' }, // Add Item Cost column
    { field: 'buyMethod', headerName: 'Buy Method', flex: 1, minWidth: 80 }, // Add Buy Method column
    { field: 'units', headerName: 'Units', flex: 1, minWidth: 80, type: 'number' },
    { field: 'daysInStock', headerName: 'Days in Stock', flex: 1, minWidth: 80 },
    { field: 'daysOnFloor', headerName: 'Days on Floor', flex: 1, minWidth: 80 },
    { field: 'daysInBack', headerName: 'Days in Back', flex: 1, minWidth: 80 },
  ];

  const CustomToolbar = () => {
    return (
      <StyledEngineProvider injectFirst>
        <GridToolbarContainer className={styles.toolbarContainer}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector
            slotProps={{ tooltip: { title: 'Change density' } }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <GridToolbarExport
            slotProps={{
              tooltip: { title: 'Export data' }
            }}
          />
        </GridToolbarContainer>
      </StyledEngineProvider>
    );
  }

  // Custom footer component with toolbar
  const CustomFooter = () => {
    return (
      <StyledEngineProvider injectFirst>
        <GridFooterContainer className={styles.footerContainer}>
          <Toolbar className={styles.componentBar}>
            <IconButton className={styles.addButton} onClick={handleAddItemClick}>
              <AddIcon />
            </IconButton>
            <IconButton className={styles.deleteButton}>
              <DeleteIcon />
            </IconButton>
          </Toolbar>
          <GridPagination />
        </GridFooterContainer>
      </StyledEngineProvider>
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <CurrentHeader pageTitle={'/inventory'} onAddClick={handleAddItemClick} />
      <div className={styles.tableContainer}>
        <DataGrid
          classes={{
            root: styles.grid,
            row: styles.row,
            cell: styles.cell,
            columnHeader: styles.columnHeader,
            columnHeaderTitle: styles.columnHeaderTitle,
          }}
          rows={rows}
          columnHeaderHeight={45} // Double the height
          rowHeight={45}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
          disableRowSelectionOnClick={true}
          onRowClick={handleRowClick}
          slots={{
            toolbar: CustomToolbar,
            footer: CustomFooter
          }}
        />
      </div>
      <GlobalFooter />
      {addItemOpen && (
        <AddInventoryItem
          open={addItemOpen}
          onClose={handleAddItemClose}
          initialValues={selectedRow}
        />
      )}
    </StyledEngineProvider>
  );
}