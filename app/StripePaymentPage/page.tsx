// app/StripePaymentPage/page.tsx
"use client";
import { Box, Typography } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from '../components/StripePaymentForm/StripePaymentForm';

const stripePromise = loadStripe('pk_test_51K1BGdDofnAaOit0kjMh77hpZhdZQpPu1NdswLdPylnu7W6AWE7JmvppAXDPQneS7Wm6Ux9nKh0S9WZ5DWvVnuIY00DoXAh6Se');

export default function StripePaymentPage() {
  return (
    <main>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor="background.default"
        p={3}
      >
        <Typography variant="h3" gutterBottom>
          Complete Your Payment
        </Typography>
        <Elements stripe={stripePromise}>
          <StripePaymentForm />
        </Elements>
      </Box>
    </main>
  );
}
