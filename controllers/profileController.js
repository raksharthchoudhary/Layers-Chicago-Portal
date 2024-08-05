const fetch = require('node-fetch');

exports.getProfile = async (req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1]; // Assuming Bearer token is passed
  const url = 'https://connect.squareupsandbox.com/v2/merchants/me';

  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
};