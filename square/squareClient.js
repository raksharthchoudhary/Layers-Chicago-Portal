const { Client, Environment } = require('square');
require('dotenv').config();

// Initialize the Square client
const client = new Client({
  environment: Environment.Sandbox, // Change to Environment.Production for live data
  accessToken: process.env.SQUARE_SANDBOX_TOKEN,
});

module.exports = client;