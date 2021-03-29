import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { checkoutSchema } from '../../utils/schema';
// Custom Components
import Divider from '../Divider';
import Heading from '../Heading';
import MyInputField from './MyInputField';

const CheckoutForm = ({ onSuccessfulCheckout, cartData }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [checkoutTotal, setCheckoutTotal] = useState(cartData.cartTotal + cartData.cartTax)
  const [checkoutError, setCheckoutError] = useState('');

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
        actions.setSubmitting(true);
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            email: values.email,
            phone: values.phone,
            address: {
              line1: values.place,
              city: values.city,
              country: 'IN',
              postal_code: values.pincode,
              state: values.state,
            },
          },
        });

        if (error) {
          setCheckoutError(error.message);
          return;
        } else {
          const { id } = paymentMethod;

          axios
            .post('/api/payment_intent', {
              id,
              amount: checkoutTotal * 100,
              email: values.email,
            })
            .then(({ data }) => {
              console.log('Created Payment Intent');

              stripe
                .confirmCardPayment(data.client_secret, {
                  payment_method: {
                    card: elements.getElement(CardElement),
                  },
                })
                .then((result) => {
                  if (result.error) {
                    console.log('Payment Intent confirmation failed');
                    setCheckoutError(result.error.message);
                    return;
                  } else {
                    console.log('Payment Intent Confirmed');
                    if (result.paymentIntent.status === 'succeeded') {
                      onSuccessfulCheckout();
                    }
                  }
                });
            })
            .catch((err) => {
              setCheckoutError(err.message);
              return;
            });
        }
      }}
      autoComplete="off"
    >
      {(props) => (
        <Form {...props}>
          {checkoutError ? <h2 className="mb-2 text-red-600">{checkoutError}</h2> : null}
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
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
            <button
              disabled={props.isSubmitting || !stripe}
              type="submit"
              className="disabled:opacity-50 w-full px-4 py-3 bg-green text-white text-center "
            >
              <a className="w-full">Checkout</a>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
