import { Form, Formik } from 'formik'
import { useState } from 'react'
import { checkoutSchema } from '../../utils/schema'

// Custom Components
import Divider from '../Divider'
import Heading from '../Heading'
import MyInputField from './MyInputField'

const CheckoutForm = ({ onSuccessfulCheckout, cartData }) => {
  const [checkoutError, setCheckoutError] = useState('')

  function loadRazorpay() {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    document.body.appendChild(script)
  }

  return (
    <Formik
      initialValues={{
        email: '',
        phone: '',
        place: '',
        pincode: '',
        city: '',
        state: '',
        country: 'India',
      }}
      validationSchema={checkoutSchema}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        loadRazorpay()

        try {
          const res = await fetch('/api/razorpay', {
            method: 'POST',
            body: JSON.stringify({
              amount: (cartData.cartTotal + cartData.cartTax) * 100,
            }),
          })
          var { data } = await res.json()
        } catch (err) {
          console.log(err.message)
        }

        let options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_ID,
          ...data,
          prefill: {
            email: values.email,
            contact: values.phone,
          },
          handler: () => {
            onSuccessfulCheckout()
          },
          notes: {
            address: `${values.place}, ${values.city}, ${values.state}, ${values.country} - ${values.pincode}`,
          },
        }
        const rzp = new Razorpay(options)
        rzp.open()
      }}
      autoComplete="off"
    >
      {(props) => (
        <Form {...props}>
          {checkoutError ? (
            <h2 className="mb-2 text-red-600">{checkoutError}</h2>
          ) : null}
          <div className="md:w-2/3">
            {/* Contact Information */}
            <div className="mb-6">
              <MyInputField
                name="email"
                type="email"
                label="Email"
                placeholder="Email Address"
              />
              <MyInputField
                name="phone"
                type="text"
                label="Phone"
                placeholder="Phone Number"
              />
            </div>
            <Divider />

            {/* Delivery Address */}
            <div className="mb-6">
              <Heading
                title={'Delivery Address'}
                type="h2"
                styles={'text-2xl font-semibold pb-4'}
              />
              <div>
                <MyInputField
                  name="place"
                  type="text"
                  label="Street Address"
                  placeholder="Street Address"
                />
                <div className="flex gap-2">
                  <MyInputField
                    name="city"
                    type="text"
                    label="City"
                    placeholder="City"
                  />
                  <MyInputField
                    name="state"
                    type="text"
                    label="State/UT"
                    placeholder="State"
                  />
                </div>
                <div className="flex gap-2">
                  <MyInputField
                    name="pincode"
                    type="text"
                    label="Pincode"
                    placeholder="Pincode"
                  />

                  <MyInputField
                    name="country"
                    type="text"
                    label="Country"
                    disabled="true"
                  />
                </div>
              </div>
            </div>
            <div className="mb-2 border border-gray-300 p-3">
              <img src="/media/Blue.png" alt="Razorpay Logo" height="200px" />
            </div>
            <button
              disabled={props.isSubmitting}
              type="submit"
              className="disabled:opacity-50 w-full px-4 py-3 bg-green text-white text-center "
            >
              <a className="w-full">Checkout</a>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CheckoutForm
