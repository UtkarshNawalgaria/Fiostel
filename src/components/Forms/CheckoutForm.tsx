'use client'

import { Form, Formik } from 'formik'
import { useState } from 'react'
import { checkoutSchema } from '../../utils/schema'
import { getErrorMessage } from '../../utils/common'

// Custom Components
import Divider from '../Divider'
import Heading from '../Heading'
import MyInputField from './MyInputField'

interface CheckoutFormProps {
  onSuccessfulCheckout: (response: unknown) => void
  cartData: {
    cartTotal: number
    cartTax: number
  }
}

const CheckoutForm = ({
  onSuccessfulCheckout,
  cartData,
}: CheckoutFormProps) => {
  const [checkoutError, setCheckoutError] = useState('')

  function loadRazorpay() {
    return new Promise((resolve) => {
      const script = document.createElement('script') as HTMLScriptElement
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
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
        await loadRazorpay()

        try {
          const res = await fetch('/api/razorpay/create-order', {
            method: 'POST',
            body: JSON.stringify({
              amount: (cartData.cartTotal + cartData.cartTax) * 100,
            }),
          })
          var { data } = await res.json()
        } catch (error) {
          console.error(getErrorMessage(error))
        }

        let options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_ID,
          ...data,
          prefill: {
            email: values.email,
            contact: values.phone,
          },
          handler: (response: unknown) => {
            onSuccessfulCheckout(response)
          },
          notes: {
            address: `${values.place}, ${values.city}, ${values.state}, ${values.country} - ${values.pincode}`,
          },
        }

        // @ts-ignore
        const rzp = new Razorpay(options)
        rzp.on(
          'payment.failed',
          function (response: { error: { [key: string]: string | number } }) {
            console.log('Error in payment', response.error)
          }
        )
        rzp.open()
      }}
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
                    disabled={true}
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
