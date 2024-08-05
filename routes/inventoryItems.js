const express = require('express');
const router = express.Router();
const { createInventoryItem, getInventoryItems } = require('../controllers/inventoryItemController');

// Route to get all inventory items
router.get('/', getInventoryItems);

// Route to create a new inventory item
router.post('/', createInventoryItem);

module.exports = router;