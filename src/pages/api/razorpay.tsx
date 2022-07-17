import { NextApiRequest, NextApiResponse } from 'next'
import { nanoid } from 'nanoid'
import client from '../../lib/razorpay'

export default async (req, res) => {

    const { amount } = JSON.parse(req.body)
    const options = {
        amount,
        currency: "INR",
        receipt: `order_${nanoid()}`,
        payment_capture: 1
    }
    try {
        const response = await client.orders.create(options)
        res.status(200).json({
            data: {
            order_id: response.id,
            amount: response.amount,
            currency: response.currency
        }})
    } catch(err) {
        res.status(400).json({ message: err})
    }
}