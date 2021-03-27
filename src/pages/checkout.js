import CartItems from '../components/CartItems';
import Heading from '../components/Heading';
import CheckoutForm from '../components/Forms/CheckoutForm'
import useCart from '../utils/cart'

export const Checkout = () => {

  const { cartTotal, cartTax } = useCart()
  
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
            <div></div>
            <div>
              <CheckoutForm />
            </div>
          </div>
          <div className="md:w-1/3 shadow-xl p-4">
            <Heading type="h3" styles="text-4xl mb-10" title="Summary" />
            <CartItems />
            <p className="text-md mt-2">
              Sub Total: <span className="text-md">₹</span> {cartTotal}
            </p>
            <p className="text-md mt-2">
              GST(18%): <span className="text-md">₹</span> {cartTax}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
