import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getErrorMessage } from '../../utils/common';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'POST') {
    try {
      const { id, amount, email } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'inr',
        payment_method: id,
        receipt_email: email
      });
      res.status(200).json({client_secret: paymentIntent.client_secret});
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: getErrorMessage(err) });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
};
