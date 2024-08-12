import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Button, Typography, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { auth } from '../../firebase/config';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const DomainDetails = () => {
  const [domain, setDomain] = useState('');
  const [serverLocation, setServerLocation] = useState('');
  const [error, setError] = useState(false);
  const [domainError, setDomainError] = useState('');

  useEffect(() => {
    const savedDomain = sessionStorage.getItem('domain');
    const savedServerLocation = sessionStorage.getItem('serverLocation');
    if (savedDomain) setDomain(savedDomain);
    if (savedServerLocation) setServerLocation(savedServerLocation);
  }, []);

  const serverLocations = [
    { value: 'us', label: 'United States' },
    { value: 'eu', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
  ];

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
    setDomainError('');
  };

  const handleServerLocationChange = (event) => {
    setServerLocation(event.target.value);
    setError(false);
  };

  const handleContinue = async () => {
    if (!serverLocation) {
      setError(true);
    } else {
      try {
        // Fetch the current count of documents in ownDomainTable
        const ownDomainCollection = collection(db, 'ownDomainTable');
        const ownDomainSnapshot = await getDocs(ownDomainCollection);
        const ownDomainCount = ownDomainSnapshot.size;

        // Set ownDomainID as the next available ID
        const ownDomainID = (ownDomainCount + 1).toString();

        // Store domain details in localStorage for use in Confirmation component
        localStorage.setItem('ownDomain', domain);
        localStorage.setItem('ownDomainID', ownDomainID);
        localStorage.setItem('ownServerLocation', serverLocation);

        console.log('Domain:', domain);
        console.log('Server Location:', serverLocation);
        console.log('Own Domain ID:', ownDomainID);

        window.location.href = 'site-info';  // Navigate to Confirmation page
      } catch (error) {
        if (error.message === 'This domain name is already taken.') {
          setDomainError('This domain name is already taken. Please choose another one.');
        } else {
          console.error('Error adding document: ', error);
          alert(`Error: ${error.message}`);
        }
      }
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
      p={3}
    >
      <Typography sx={{color:"black"}} variant="h5" mb={3}>Your own domain</Typography>
      <Box
        component="form"
        sx={{ width: '100%', maxWidth: '400px' }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <TextField
          label="Your own domain"
          variant="outlined"
          fullWidth
          value={domain}
          onChange={handleDomainChange}
          helperText="For example: mydomain.com or community.mydomain.com"
          margin="normal"
          error={!!domainError}
        />
        <FormControl fullWidth margin="normal" error={error}>
          <InputLabel htmlFor="serverLocation">Server location</InputLabel>
          <Select
            value={serverLocation}
            onChange={handleServerLocationChange}
            label="Server location"
            inputProps={{ id: 'serverLocation' }}
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
        <Box mt={3} display="flex" justifyContent="space-between" width="100%">
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleContinue}>
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DomainDetails;
