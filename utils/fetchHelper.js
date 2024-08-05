const fetch = require('node-fetch');

const fetchHelper = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    throw new Error('Fetch error');
  }
};

module.exports = fetchHelper;