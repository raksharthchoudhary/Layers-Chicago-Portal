const fetch = require('node-fetch');
const { clientId, clientSecret, redirectUri } = require('../config/keys');

exports.callback = async (req, res) => {
  const code = req.query.code;
  const url = 'https://connect.squareupsandbox.com/oauth2/token';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data.error) {
      console.error(data.error);
      return res.status(500).send(data.error);
    }

    const accessToken = data.access_token;
    if (!accessToken) {
      console.error('No access token received');
      return res.status(500).send('No access token received');
    }
    // Store the access token securely and handle user session
    res.redirect(`http://localhost:3000/home?token=${accessToken}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
};