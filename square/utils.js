// /api/utils.js
function serializeBigInt(data) {
    return JSON.parse(JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
  }
  
module.exports = { serializeBigInt };  