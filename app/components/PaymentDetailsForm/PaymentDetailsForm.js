import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

const PaymentDetailsForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [updatesSubscribed, setUpdatesSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryMonthChange = (event) => {
    setExpiryMonth(event.target.value);
  };

  const handleExpiryYearChange = (event) => {
    setExpiryYear(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleCardHolderChange = (event) => {
    setCardHolder(event.target.value);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleUpdatesChange = (event) => {
    setUpdatesSubscribed(event.target.checked);
  };

  const handleSubmit = () => {
    if (!termsAccepted) {
      setError('You must accept the terms and conditions.');
    } else {
      setError('');
      window.location.href = '/SiteOnTheWay';
    }
  };

  const handleCancel = () => {
    window.location.href = '/DomainDetails';
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
      <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
        Payment Details
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="start"
        bgcolor="background.paper"
        p={4}
        borderRadius={2}
        boxShadow={3}
        width="400px"
      >
        <TextField
          label="Card Number"
          value={cardNumber}
          onChange={handleCardNumberChange}
          fullWidth
          margin="normal"
          placeholder="Enter your card number"
          sx={{ color: 'black' }}
        />
        <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="expiryMonth-label" sx={{ color: 'black' }}>Exp Month</InputLabel>
            <Select
              labelId="expiryMonth-label"
              value={expiryMonth}
              onChange={handleExpiryMonthChange}
              label="Exp Month"
            >
              <MenuItem value="" disabled>Select month</MenuItem>
              {[...Array(12).keys()].map((month) => (
                <MenuItem key={month + 1} value={month + 1}>
                  {String(month + 1).padStart(2, '0')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="expiryYear-label" sx={{ color: 'black' }}>Exp Year</InputLabel>
            <Select
              labelId="expiryYear-label"
              value={expiryYear}
              onChange={handleExpiryYearChange}
              label="Exp Year"
            >
              <MenuItem value="" disabled>Select year</MenuItem>
              {[...Array(10).keys()].map((year) => (
                <MenuItem key={year + new Date().getFullYear()} value={year + new Date().getFullYear()}>
                  {year + new Date().getFullYear()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="CVV"
              value={cvv}
              onChange={handleCvvChange}
              type="password"
              placeholder="Enter CVV"
              sx={{ color: 'black' }}
            />
          </FormControl>
        </Box>
        <TextField
          label="Card Holder"
          value={cardHolder}
          onChange={handleCardHolderChange}
          fullWidth
          margin="normal"
          placeholder="Enter card holder name"
          sx={{ color: 'black' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAccepted}
              onChange={handleTermsChange}
              color="primary"
            />
          }
          label="I agree to the Forem2go terms"
          sx={{ color: 'black', alignItems: 'center' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={updatesSubscribed}
              onChange={handleUpdatesChange}
              color="primary"
            />
          }
          label="Send me product and services updates by email"
          sx={{ color: 'black', alignItems: 'center' }}
        />
        {error && <Typography color="error" mt={2}>{error}</Typography>}
        <Box display="flex" justifyContent="space-between" width="100%" mt={3}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            sx={{ flex: 1, mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ flex: 1, ml: 1 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentDetailsForm;
