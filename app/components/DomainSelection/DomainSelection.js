import React, { useState } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';
import { auth } from '../../firebase/config';
import { addDomainSelection } from '../../firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

const DomainSelection = () => {
  const [selectedDomain, setSelectedDomain] = useState('');

  const handleChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleContinue = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await addDomainSelection(user.uid, selectedDomain);

        if (selectedDomain === 'free') {
          window.location.href = '/FreeDomainForm';
        } else {
          window.location.href = '/Yourowndomain';
        }
      } else {
        console.error('No authenticated user found');
      }
    } catch (error) {
      console.error('Error adding document: ', error);
      alert(`Error: ${error.message}`);
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
          <Button variant="outlined" className="btn btn-outline-secondary" onClick={handleGoBack}>
            Go back
          </Button>
          <Button variant="contained" className="btn btn-primary" onClick={handleContinue}>
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DomainSelection;
