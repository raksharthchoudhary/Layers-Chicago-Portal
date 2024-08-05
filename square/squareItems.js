const client = require('./squareClient');
const { v4: uuidv4 } = require('uuid');
const { catalogApi, inventoryApi, locationsApi } = client;

async function fetchItems() {
  try {
    const response = await catalogApi.listCatalog();
    const items = response.result.objects;
    return items;
  } catch (error) {
    console.error('Error in fetchItems:', error);
    throw error;
  }
}

async function fetchInventoryCounts(itemVariationIds) {
  try {
    const response = await inventoryApi.batchRetrieveInventoryCounts({
      catalogObjectIds: itemVariationIds,
    });
    return response.result.counts.reduce((acc, count) => {
      acc[count.catalogObjectId] = count.quantity;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error in fetchInventoryCounts:', error);
    return {};
  }
}

async function getItem(itemId) {
  try {
    const response = await catalogApi.retrieveCatalogObject(itemId);
    return response.result.object;
  } catch (error) {
    console.error('Error in getItem:', error);
    throw error;
  }
}

async function getDefaultLocationId() {
  try {
    const response = await locationsApi.listLocations();
    if (response.result.locations.length > 0) {
      return response.result.locations[0].id; // Use the first location ID
    } else {
      throw new Error('No locations found for this merchant.');
    }
  } catch (error) {
    console.error('Error in getDefaultLocationId:', error);
    throw error;
  }
}

async function updateItem(itemId, itemName, itemPrice, itemStock, itemVariationId) {
  try {
    // Fetch the latest version of the item
    const item = await getItem(itemId);

    // Get the location ID from the item's data if it exists, otherwise get default location ID
    let locationId = null;
    if (item.presentAtAllLocations) {
      locationId = await getDefaultLocationId();
    } else {
      const variation = item.itemData.variations.find(v => v.id === itemVariationId);
      if (!variation) {
        throw new Error(`Variation with ID ${itemVariationId} not found`);
      }
      locationId = variation.itemVariationData.locationOverrides
        ? variation.itemVariationData.locationOverrides[0].locationId
        : null;
    }

    // Ensure locationId is not null
    if (!locationId) {
      throw new Error('Location ID is required and cannot be null.');
    }

    // Preserve existing item data
    const updatedItemData = {
      name: itemName,
      isTaxable: item.itemData.isTaxable,
      productType: item.itemData.productType,
      skipModifierScreen: item.itemData.skipModifierScreen,
      categories: item.itemData.categories,
      reportingCategory: item.itemData.reportingCategory,
      variations: [
        {
          type: 'ITEM_VARIATION',
          id: itemVariationId,
          version: item.itemData.variations.find(v => v.id === itemVariationId).version, // Include the latest version of the variation
          itemVariationData: {
            itemId: itemId,
            name: 'Regular',
            pricingType: 'FIXED_PRICING',
            priceMoney: {
              amount: itemPrice,
              currency: 'USD' // Ensure currency is set
            },
            trackInventory: true,
            sellable: true,
            stockable: true,
            locationOverrides: [
              {
                locationId: locationId,
                trackInventory: true
              }
            ]
          }
        }
      ]
    };

    // Update item name and variation
    await catalogApi.upsertCatalogObject({
      idempotencyKey: uuidv4(),
      object: {
        type: 'ITEM',
        id: itemId,
        version: item.version, // Include the latest version
        itemData: updatedItemData,
      }
    });

    // Update item stock
    const inventoryCount = {
      catalogObjectId: itemVariationId,
      quantity: itemStock.toString(), // Convert quantity to string
      state: 'IN_STOCK',
      locationId: locationId, // Include the correct location ID
      occurredAt: new Date().toISOString() // Set the occurred_at timestamp
    };

    await inventoryApi.batchChangeInventory({
      idempotencyKey: uuidv4(),
      changes: [{
        type: 'PHYSICAL_COUNT',
        physicalCount: inventoryCount,
      }],
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error in updateItem:', error);
    throw error;
  }
}

module.exports = { fetchItems, fetchInventoryCounts, updateItem };
