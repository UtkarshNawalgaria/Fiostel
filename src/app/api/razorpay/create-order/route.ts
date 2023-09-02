import { nanoid } from 'nanoid'
import razorpayClient from '../../../../lib/razorpay'

export async function POST(request: Request) {
  const { amount } = await request.json()
  const options = {
    amount,
    currency: 'INR',
    receipt: `order_${nanoid()}`,
  }
  let status: number, data: { [key: string]: unknown }

  try {
    const response = await razorpayClient.orders.create(options)

    status = 200
    data = {
      order_id: response.id,
      amount: response.amount,
      currency: response.currency,
    }
  } catch (err) {
    status = 400
    data = { message: err }
  }

  return new Response(JSON.stringify(data), {
    status,
  })
}
