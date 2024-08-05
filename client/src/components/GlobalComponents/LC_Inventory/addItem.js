import * as React from 'react';
import styles from './addItem.module.scss';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { StyledEngineProvider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { NumericFormat } from 'react-number-format';
import axios from 'axios';

export default function AddInventoryItem({ open, onClose, initialValues }) {
    const initialState = initialValues || {
        name: '',
        brand: '',
        color: '',
        material: '',
        category: '',
        size: '',
        price: '',
        itemCost: '',
        buyMethod: '',
        units: '1', // Default value set to 1
        location: '',
    };

    const initialErrorState = {
        name: false,
        category: false,
        location: false,
        price: false,
        itemCost: false,
        buyMethod: false,
        units: false,
    };

    const [inventoryItem, setInventoryItem] = React.useState(initialState);
    const [errors, setErrors] = React.useState(initialErrorState);
    const [generatedSKU, setGeneratedSKU] = React.useState(initialState.sku || '');
    const [dateAdded, setDateAdded] = React.useState(initialState.dateAdded || '');

    const [itemCategories, setItemCategories] = React.useState([]);
    const [itemBrands, setItemBrands] = React.useState([]);
    const [itemColors, setItemColors] = React.useState(['Red', 'Blue', 'Green']); // Initial colors
    const [itemLocations, setItemLocations] = React.useState(['Floor', 'Back Stock']);
    const [itemMaterials, setItemMaterials] = React.useState([
        'Cotton',
        'Wool',
        'Leather',
        'Suede',
        'Denim',
        'Silk',
        'Linen',
        'Nylon',
        'Spandex'
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInventoryItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (value) {
            setErrors((prevState) => ({
                ...prevState,
                [name]: false,
            }));
        }
    };

    const handlePriceChange = (values) => {
        const { floatValue } = values;
        setInventoryItem((prevState) => ({
            ...prevState,
            price: floatValue !== undefined ? floatValue.toFixed(2) : ''
        }));

        if (floatValue !== undefined) {
            setErrors((prevState) => ({
                ...prevState,
                price: false,
            }));
        }
    };

    const handleItemCostChange = (values) => {
        const { floatValue } = values;
        setInventoryItem((prevState) => ({
            ...prevState,
            itemCost: floatValue !== undefined ? floatValue.toFixed(2) : ''
        }));

        if (floatValue !== undefined) {
            setErrors((prevState) => ({
                ...prevState,
                itemCost: false,
            }));
        }
    };

    const handleSubmit = async () => {
        const newErrors = {};
        if (!inventoryItem.name) newErrors.name = true;
        if (!inventoryItem.category) newErrors.category = true;
        if (!inventoryItem.location) newErrors.location = true;
        if (!inventoryItem.price) newErrors.price = true;
        if (!inventoryItem.itemCost) newErrors.itemCost = true;
        if (!inventoryItem.tradeCounter) newErrors.buyMethod = true;
        if (!inventoryItem.units) newErrors.units = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/inventory-items', inventoryItem);
            console.log('Item added:', response.data);
            setGeneratedSKU(response.data.sku);
            setDateAdded(new Date().toISOString().split('T')[0]); // Set the current date
            // Close the dialog and return the new item
            onClose(response.data);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleAddNewOption = (e, listSetter, list) => {
        const newItem = e.target.value;
        if (newItem === 'ADD_NEW') {
            const promptNewItem = prompt('Enter new item:');
            if (promptNewItem && !list.includes(promptNewItem)) {
                listSetter([...list, promptNewItem]);
                setInventoryItem({
                    ...inventoryItem,
                    [e.target.name]: promptNewItem
                });
            }
        } else {
            handleInputChange(e);
        }
    };

    const sizes = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL+', 'Youth S', 'Youth M', 'Youth L', 'Youth XL'];

    const handleClose = () => {
        setInventoryItem(initialState);
        setErrors(initialErrorState);
        setGeneratedSKU('');
        setDateAdded('');
        onClose();
    };

    return (
        <Box>
            <StyledEngineProvider injectFirst>
                <Dialog 
                    open={open} 
                    onClose={(event, reason) => {
                        if (reason !== 'backdropClick') {
                            handleClose();
                        }
                    }}
                    classes={{ paper: styles.container }}
                >
                    <DialogContent className={styles.content}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                    name="name" 
                                    label="Name*" 
                                    value={inventoryItem.name} 
                                    fullWidth 
                                    onChange={handleInputChange}
                                    error={errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <NumericFormat
                                    name="price"
                                    label="Selling Price*"
                                    value={inventoryItem.price}
                                    customInput={TextField}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    fullWidth
                                    placeholder="0.00"
                                    onValueChange={handlePriceChange}
                                    error={errors.price}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={errors.category}>
                                    <InputLabel>Category*</InputLabel>
                                    <Select
                                        name="category"
                                        value={inventoryItem.category}
                                        onChange={(e) => handleAddNewOption(e, setItemCategories, itemCategories)}
                                        label="Category*"
                                    >
                                        {itemCategories.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                        <MenuItem value="ADD_NEW">
                                            <em>+ Add a new category...</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <NumericFormat
                                    name="itemCost"
                                    label="Item Cost"
                                    value={inventoryItem.itemCost}
                                    customInput={TextField}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    fullWidth
                                    placeholder="0.00"
                                    onValueChange={handleItemCostChange}
                                    error={errors.itemCost}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={errors.buyMethod}>
                                    <InputLabel>Buy Method</InputLabel>
                                    <Select
                                        name="buyMethod"
                                        value={inventoryItem.tradeCounter}
                                        onChange={handleInputChange}
                                        label="Buy Method"
                                    >
                                        <MenuItem value="Trade">Trade</MenuItem>
                                        <MenuItem value="WholeSale">Wholesale</MenuItem>
                                        <MenuItem value="Counter">Counter</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Brand</InputLabel>
                                    <Select
                                        name="brand"
                                        value={inventoryItem.brand}
                                        onChange={(e) => handleAddNewOption(e, setItemBrands, itemBrands)}
                                        label="Brand"
                                    >
                                        {itemBrands.map((brand) => (
                                            <MenuItem key={brand} value={brand}>
                                                {brand}
                                            </MenuItem>
                                        ))}
                                        <MenuItem value="ADD_NEW">
                                            <em>+ Add a new brand...</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Color</InputLabel>
                                    <Select
                                        name="color"
                                        value={inventoryItem.color}
                                        onChange={(e) => handleAddNewOption(e, setItemColors, itemColors)}
                                        label="Color"
                                    >
                                        {itemColors.map((color) => (
                                            <MenuItem key={color} value={color}>
                                                {color}
                                            </MenuItem>
                                        ))}
                                        <MenuItem value="ADD_NEW">
                                            <em>+ Add a new color...</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Size</InputLabel>
                                    <Select
                                        name="size"
                                        value={inventoryItem.size}
                                        onChange={handleInputChange}
                                        label="Size"
                                    >
                                        {sizes.map((size) => (
                                            <MenuItem key={size} value={size}>
                                                {size}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Material</InputLabel>
                                    <Select
                                        name="material"
                                        value={inventoryItem.material}
                                        onChange={(e) => handleAddNewOption(e, setItemMaterials, itemMaterials)}
                                        label="Material"
                                    >
                                        {itemMaterials.map((material) => (
                                            <MenuItem key={material} value={material}>
                                                {material}
                                            </MenuItem>
                                        ))}
                                        <MenuItem value="ADD_NEW">
                                            <em>+ Add a new material...</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    name="units" 
                                    label="Units*" 
                                    type="number" 
                                    value={inventoryItem.units} 
                                    fullWidth 
                                    onChange={handleInputChange}
                                    error={errors.units}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={errors.location}>
                                    <InputLabel>Location*</InputLabel>
                                    <Select
                                        name="location"
                                        value={inventoryItem.location}
                                        onChange={(e) => handleAddNewOption(e, setItemLocations, itemLocations)}
                                        label="Location*"
                                    >
                                        {itemLocations.map((location) => (
                                            <MenuItem key={location} value={location}>
                                                {location}
                                            </MenuItem>
                                        ))}
                                        <MenuItem value="ADD_NEW">
                                            <em>+ Add a new location...</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {dateAdded && (
                                <Grid item xs={12} sm={6}>
                                    <TextField name="dateAdded" label="Date Added" value={dateAdded} fullWidth InputProps={{ readOnly: true }} />
                                </Grid>
                            )}
                            {generatedSKU && (
                                <Grid item xs={12}>
                                    <TextField name="generatedSKU" label="Generated SKU" value={generatedSKU} fullWidth InputProps={{ readOnly: true }} />
                                </Grid>
                            )}
                        </Grid>
                        <Toolbar className={styles.componentBar}>
                            <IconButton className={styles.doneButton} onClick={handleSubmit}>
                                <CheckIcon />
                            </IconButton>
                            <IconButton className={styles.closeButton} onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </DialogContent>
                </Dialog>
            </StyledEngineProvider>
        </Box>
    );
}
