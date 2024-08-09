// app/api/createPaymentIntent/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51K1BGdDofnAaOit0bBiLcqMQhhXyJrQxoGrXgkIOcaVZLfT6ATD59TwDiD3JUtB0glUUakwHdQyPyEjsOpwIv0oT00zrHjNd34');

export async function POST(req: Request) {
  try {
    const { paymentMethodId } = await req.json();

    console.log('Received request:', { paymentMethodId });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Specify the amount here
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    console.log('Created payment intent:', paymentIntent);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
