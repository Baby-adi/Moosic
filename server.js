import express from 'express';
import axios from 'axios';
import qs from 'qs';
import cors from 'cors'; // Correct usage of import for CORS middleware

const app = express();
const PORT = process.env.PORT || 5000; // You can change the port if needed

// Enable CORS for all routes
app.use(cors());

// Add Spotify API credentials here
const SPOTIFY_CLIENT_ID = '5857854b66164bd8897c2fca87ac98a8'; // Your client ID
const SPOTIFY_CLIENT_SECRET = '6dd94c09bac84eaba56a963a39ad55c3'; // Your client secret

// Route to fetch access token from Spotify API
app.get('/get-access-token', async (req, res) => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify({ grant_type: 'client_credentials' }),
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token } = response.data;
    res.json({ access_token }); // Send the token back to the frontend
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).json({ error: 'Failed to get access token' });
  }
});

// Example route for testing your server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
