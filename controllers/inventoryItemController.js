const InventoryItem = require('../models/inventoryItemModel');

const createInventoryItem = async (req, res) => {
  const {
    name,
    category,
    sku,
    brand,
    color,
    material,
    size,
    price,
    itemCost,
    buyMethod,
    units,
    daysInStock,
    daysOnFloor,
    daysInBack,
  } = req.body;

  try {
    const inventoryItem = new InventoryItem({
      name,
      category,
      sku,
      brand,
      color,
      material,
      size,
      price,
      itemCost,
      buyMethod,
      units,
      daysInStock,
      daysOnFloor,
      daysInBack,
      // dateAdded is automatically set to the current date by default
    });

    await inventoryItem.save();
    res.status(201).send(inventoryItem);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find();
    res.status(200).send(inventoryItems);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createInventoryItem,
  getInventoryItems,
};