const express = require('express');
const router = express.Router();
const { fetchItems, fetchInventoryCounts, updateItem } = require('./squareItems');
const { serializeBigInt } = require('./utils');

// Fetch all items and their inventory counts
router.get('/items', async (req, res) => {
  try {
    const items = await fetchItems();
    const itemVariationIds = items
      .filter(item => item.type === 'ITEM')
      .flatMap(item => item.itemData.variations.map(variation => variation.id));

    const inventoryCounts = await fetchInventoryCounts(itemVariationIds);

    const itemsWithStock = items.map(item => {
      if (item.type === 'ITEM') {
        item.itemData.variations = item.itemData.variations.map(variation => {
          variation.itemVariationData.stockCount = inventoryCounts[variation.id] || 0;
          return variation;
        });
      }
      return item;
    });

    res.json(serializeBigInt(itemsWithStock)); // Use the custom serializer
  } catch (error) {
    console.error('Error fetching items:', error); // Log the error details
    res.status(500).send('Internal Server Error');
  }
});

// Update an item based on provided details
router.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { itemName, itemPrice, itemStock, itemVariationId } = req.body;

  // Validate the request body
  if (!itemName || !itemPrice || !itemStock || !itemVariationId) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const updatedItem = await updateItem(id, itemName, itemPrice, itemStock, itemVariationId);
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error); // Log the error details
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;