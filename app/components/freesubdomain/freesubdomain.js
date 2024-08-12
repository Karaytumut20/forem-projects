import React, { useState, useEffect } from 'react';
import { Box, TextField, Select, MenuItem, Button, Typography, FormControl, InputLabel, FormHelperText } from '@mui/material';

const FreeDomainForm = () => {
  const [domain, setDomain] = useState('');
  const [location, setLocation] = useState('');  // Correctly name the state to `location`
  const [error, setError] = useState(false);
  const [freeDomainID, setFreeDomainID] = useState(1);  // Initialize freeDomainID state

  const serverLocations = [
    { value: 'us', label: 'United States' },
    { value: 'eu', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
  ];

  useEffect(() => {
    // Get the last freeDomainID from localStorage
    const lastID = localStorage.getItem('freeDomainID');
    if (lastID) {
      setFreeDomainID(parseInt(lastID) + 1); // Increment ID by 1
    }
  }, []);

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };

  const handleServerLocationChange = (event) => {
    setLocation(event.target.value);  // Correctly set the location state
    setError(false);
  };

  const handleContinue = () => {
    if (!location || !domain) {
      setError(true);
    } else {
      // Store the data in localStorage
      localStorage.setItem('freeDomain', domain);
      localStorage.setItem('serverLocation', location);  // Store with correct key
      localStorage.setItem('freeDomainID', freeDomainID); // Store the updated freeDomainID

      window.location.href = 'site-info';
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      p={3}
    >
      <Typography variant="h5" gutterBottom sx={{color:"black"}}>
        Free domain
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="background.paper"
        p={4}
        borderRadius={2}
        boxShadow={3}
        width="400px"
      >
        <TextField
          label="Domain"
          value={domain}
          onChange={handleDomainChange}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: '.forem2go.org',
          }}
        />
        {error && <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          Please enter a domain name
        </Typography>}
        
        <FormControl fullWidth margin="normal" error={error}>
          <InputLabel id="serverLocation-label">Server location</InputLabel>
          <Select
            labelId="serverLocation-label"
            value={location}
            onChange={handleServerLocationChange}
            label="Server location"
          >
            <MenuItem value="" disabled>Select server location</MenuItem>
            {serverLocations.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>Please choose your location</FormHelperText>}
        </FormControl>
        
        <Box display="flex" justifyContent="space-between" width="100%" mt={3}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleGoBack}
            sx={{ flex: 1, mr: 1 }}
          >
            Go back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleContinue}
            sx={{ flex: 1, ml: 1 }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FreeDomainForm;
