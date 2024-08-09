// app/StripePaymentPage/page.tsx
"use client";
import { Box, Typography } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from '../../components/checkout/checkout';

const stripePromise = loadStripe('pk_live_51K1BGdDofnAaOit0Z0CrVz94gALSYnORP8BeaYF8ioBU5W9dTCfssuRGInjLnS3pRULzwqz6hM2CNKUk8S8LVRVw00fbAb2o6e');

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
