import Razorpay from "razorpay"

export default new Razorpay({
    key_id: process.env.RAZORPAY_SECRET_ID,
    key_secret: process.env.RAZORPAY_SECRET
})
