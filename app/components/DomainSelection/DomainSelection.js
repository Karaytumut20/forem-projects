import React, { useState } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';

const DomainSelection = () => {
  const [selectedDomain, setSelectedDomain] = useState('');

  const handleChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleContinue = () => {
    if (selectedDomain === 'free') {
      window.location.href = '/FreeDomainForm';
    } else {
      window.location.href = '/Yourowndomain';
    }
  };

  const handleGoBack = () => {
    window.location.href = '/';
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.paper"
        p={4}
        borderRadius={2}
        boxShadow={3}
        width="400px"
      >
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ fontSize: '24px', fontWeight: 'bold', mb: 2, color: 'black' }}>
            Choose type of your domain
          </FormLabel>
          <Box mt={2} mb={2} sx={{ fontSize: '16px', color: 'black' }}>
            You Can Create Free OR Your Own Domain
          </Box>
          <RadioGroup aria-label="domain" name="domain" value={selectedDomain} onChange={handleChange}>
            <FormControlLabel value="free" control={<Radio />} label={<span style={{ color: 'black' }}>Free domain</span>} />
            <FormControlLabel value="own" control={<Radio />} label={<span style={{ color: 'black' }}>Your own domain</span>} />
          </RadioGroup>
        </FormControl>
        <Box mt={3} display="flex" justifyContent="space-between" width="100%">
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

export default DomainSelection;
