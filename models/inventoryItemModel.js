const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventoryItemSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  color: { type: String, required: true },
  material: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  itemCost: { type: Number, required: true },
  buyMethod: { type: String, required: true },
  units: { type: Number, required: true },
  daysInStock: { type: Number, required: true },
  daysOnFloor: { type: Number, required: true },
  daysInBack: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now }
});

// Adding indexes
inventoryItemSchema.index({ sku: 1 }); // Unique index on SKU
inventoryItemSchema.index({ name: 1 }); // Index on name
inventoryItemSchema.index({ category: 1 }); // Index on category
inventoryItemSchema.index({ brand: 1 }); // Index on brand
inventoryItemSchema.index({ price: 1 }); // Index on price
inventoryItemSchema.index({ itemCost: 1 }); // Index on itemCost
inventoryItemSchema.index({ daysInStock: 1 }); // Index on daysInStock
inventoryItemSchema.index({ daysOnFloor: 1 }); // Index on daysOnFloor
inventoryItemSchema.index({ daysInBack: 1 }); // Index on daysInBack
inventoryItemSchema.index({ dateAdded: 1 }); // Index on dateAdded

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

module.exports = InventoryItem;
