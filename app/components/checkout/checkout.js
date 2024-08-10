import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Typography, FormControlLabel, Checkbox, TextField } from '@mui/material';

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [cardHolder, setCardHolder] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [updatesSubscribed, setUpdatesSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [planName, setPlanName] = useState('');
  const [planPrice, setPlanPrice] = useState('');

  useEffect(() => {
    const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan'));
    if (selectedPlan) {
      setPlanName(selectedPlan.name);
      setPlanPrice(selectedPlan.price);
    }
  }, []);

  const handleCardHolderChange = (event) => {
    setCardHolder(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleUpdatesChange = (event) => {
    setUpdatesSubscribed(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!termsAccepted) {
      setError('You must accept the terms and conditions.');
      return;
    }

    setError('');
    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: cardHolder,
        address: {
          postal_code: zipCode,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      alert(`Payment failed: ${error.message}`);
    } else {
      try {
        // Convert price to cents
        const amount = parseFloat(planPrice.replace('$', '')) * 100;

        const response = await fetch('/api/createPaymentIntent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount }),
        });

        const paymentIntent = await response.json();

        if (paymentIntent.error) {
          setError(paymentIntent.error.message);
          setLoading(false);
          alert(`Payment failed: ${paymentIntent.error.message}`);
        } else {
          const { error: confirmError } = await stripe.confirmCardPayment(paymentIntent.clientSecret);

          if (confirmError) {
            setError(confirmError.message);
            setLoading(false);
            alert(`Payment failed: ${confirmError.message}`);
          } else {
            setLoading(false);
            alert('Payment successful!');
            window.location.href = 'deployment';
          }
        }
      } catch (err) {
        console.error('Error during payment:', err);
        setError('An unexpected error occurred.');
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    window.location.href = 'confirmation';
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
      <Button
        variant="text"
        color="inherit"
        sx={{ alignSelf: 'start', marginBottom: 3 }}
        onClick={handleCancel}
      >
        &lt; back
      </Button>

      <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
        Payment details for {planName}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          label="Card Holder"
          value={cardHolder}
          onChange={handleCardHolderChange}
          fullWidth
          margin="normal"
          placeholder="Enter card holder name"
          sx={{ color: 'black' }}
        />
        <Box width="100%" mb={2}>
          <CardElement
            options={{
              style: {
                base: {
                  color: '#000',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#fa755a',
                },
              },
              hidePostalCode: true,
            }}
          />
        </Box>
        <TextField
          label="ZIP Code"
          value={zipCode}
          onChange={handleZipCodeChange}
          fullWidth
          margin="normal"
          placeholder="Enter ZIP code"
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
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ flex: 1, ml: 1 }}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay now ${planPrice} to start building your amazing community.`}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StripePaymentForm;
