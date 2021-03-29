import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CartItems from '../components/CartItems';
import CheckoutForm from '../components/Forms/CheckoutForm';
import Heading from '../components/Heading';
import useCart from '../utils/cart';

const stripePromise = loadStripe('pk_test_3SBzBAIoZpAhotxW2LLNKeU400Qu1rj3kD');

export const Checkout = () => {
  const { cart, cartTotal, cartTax } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cafe');
    }
  }, [cart]);

  return (
    <div className="bg-gray-100 py-5">
      <div className="container px-4 container md:mx-auto md:max-w-4xl">
        <section className="text-center py-6">
          <Heading
            title={'Checkout Page'}
            type="h1"
            styles={'text-4xl font-semibold pb-2'}
          />
        </section>
        <section className="md:flex mb-10 gap-2">
          <div className="md:w-2/3">
            <div>
              <Heading
                title={'Contact Information'}
                type="h2"
                styles={'text-2xl font-semibold pb-4'}
              />
              <div>
                <Elements stripe={stripePromise}>
                  <CheckoutForm onSuccessfulCheckout={() => router.push('/success')} cartData={{cartTotal, cartTax}}/>
                </Elements>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 shadow-xl p-4">
            <div className="h-auto">
              <Heading type="h3" styles="text-4xl mb-10" title="Summary" />
              <CartItems />
              <p className="text-md mt-2">
                Sub Total: <span className="text-md">₹</span> {cartTotal}
              </p>
              <p className="text-md mt-2">
                GST(18%): <span className="text-md">₹</span> {cartTax}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
