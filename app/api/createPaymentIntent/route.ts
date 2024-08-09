// app/api/createPaymentIntent/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51K1BGdDofnAaOit0bBiLcqMQhhXyJrQxoGrXgkIOcaVZLfT6ATD59TwDiD3JUtB0glUUakwHdQyPyEjsOpwIv0oT00zrHjNd34');

export async function POST(req: Request) {
  try {
    const { paymentMethodId, paymentIntentId } = await req.json();

    let paymentIntent;

    if (paymentIntentId) {
      // Fetch the existing PaymentIntent
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status === 'succeeded') {
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
      }
    } else {
      // Create a new PaymentIntent if one doesn't exist
      paymentIntent = await stripe.paymentIntents.create({
        amount: 1000, // Specify the amount here
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
      });
    }

    console.log('Created or retrieved payment intent:', paymentIntent);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating or retrieving payment intent:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
