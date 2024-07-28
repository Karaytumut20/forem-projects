// /components/DomainSelector.js

import React, { useState } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';

const DomainSelection = () => {
  const [selectedDomain, setSelectedDomain] = useState('');

  const handleChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleContinue = () => {
    // Handle the continue action based on selected domain
    console.log("Selected Domain:", selectedDomain);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#ffffff"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgcolor="#f5f5f5"
        p={4}
        borderRadius={2}
        boxShadow={3}
        width="400px"
      >
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            Choose type of your domain
          </FormLabel>
          <Box mt={2} mb={2} style={{ fontSize: '16px', color: '#666666' }}>
            You Can Create Free OR Your Own Domain
          </Box>
          <RadioGroup aria-label="domain" name="domain" value={selectedDomain} onChange={handleChange}>
            <FormControlLabel value="free" control={<Radio />} label="Free domain" />
            <FormControlLabel value="own" control={<Radio />} label="Your own domain" />
          </RadioGroup>
        </FormControl>
        <Box mt={3} display="flex" justifyContent="space-between" width="100%">
          <Button variant="outlined" onClick={() => console.log("Go back")}>
            Go back
          </Button>
          <Button variant="contained" color="primary" onClick={handleContinue}>
            Continue
          </Button>
        </Box>
      </Box>
      <Box mt={4} style={{ fontSize: '14px', color: '#666666' }}>
        01 / 04
      </Box>
    </Box>
  );
};

export default DomainSelection;
