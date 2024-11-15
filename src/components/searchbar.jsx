import React, { useState } from 'react';
import { TextField, Button, Box, Container, Paper, Typography } from '@mui/material';
import '../styles/searchbar.css';


const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const handleSearch = () => {
        onSearch(query);
    };
    return (
        <Container maxWidth="sm">
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    mt: 4,
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Typography variant="h5" component="h1" align="center" gutterBottom>
                    Discover Music
                </Typography>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="row"
                    mt={2}
                    sx={{ boxSizing: 'border-box', width: 400 }}
                >
                    <TextField
                        label="Search for a song or artist"
                        variant="outlined"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="customTextField"  
                        sx={{
                            padding: '2px',
                            marginRight: 2,
                            width: 350,
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        sx={{
                            minWidth: 140,
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            padding: '8px 16px',
                        }}
                    >
                        Search
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};
export default SearchBar;
