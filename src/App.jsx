import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchbar.jsx';
import './styles/styles.css';
import { Container, Typography, Box, Paper, IconButton } from '@mui/material';
import SpotifyIcon from './assets/spotify-icon.png'; // Add Spotify icon to assets folder
import YouTubeIcon from './assets/youtube-icon.png'; // Add YouTube icon to assets folder
import 'bootstrap/dist/css/bootstrap.min.css';
import { brown } from '@mui/material/colors';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-access-token');
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };
    fetchAccessToken();
  }, []);

  const handleSearch = async (query) => {
    if (!query) return;

    try {
      if (!accessToken) {
        throw new Error('Access token is not available');
      }

      setLoading(true);

      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setSearchResults(data.tracks.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Container>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            background: "rgb(0,0,0)",
            background: "linear-gradient(90deg, rgba(0,0,0,1) 100%, rgba(9,107,121,1) 100%, rgba(0,212,255,1) 100%)",
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box textAlign="center" my={4}>
            <Typography style={{color:"white"}} variant="h3" gutterBottom> 
              Moosic
            </Typography>
            <SearchBar onSearch={handleSearch} />
          </Box>
          <Box mt={4}>
            <Typography variant="h5" style={{color:"white"}} gutterBottom>
              Search Results:
            </Typography>
            {loading ? (
              <Typography style={{color:"white"}} >Loading...</Typography>
            ) : searchResults.length === 0 ? (
              <Typography style={{color:"white"}}>No results found.</Typography>
            ) : (
              searchResults.map((result, index) => (
                <Box key={index} className="result-item" p={1}>
                  <Typography variant="h6">{result.name}</Typography>
                  <Typography variant="body2">Artist: {result.artists[0].name}</Typography>

                  {/* Spotify and YouTube icons */}
                  <Box display="flex" mt={1}>
                    <IconButton
                      href={result.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ padding: 1 }}
                    >
                      <img src={SpotifyIcon} alt="Spotify" width="30" />
                    </IconButton>
                    <IconButton
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(result.name + ' ' + result.artists[0].name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ padding: 1 }}
                    >
                      <img src={YouTubeIcon} alt="YouTube" width="30" />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
