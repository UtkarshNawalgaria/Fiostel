import {useContext} from 'react'
import {CartContext} from '../utils/cart'
import Link from 'next/link';

const CartItems = () => {

    const {cart, changeQuantity, removeItem, cartTotal} = useContext(CartContext)

    return (
      <>
        <h3 className="text-4xl mb-10">Cart</h3>
        <div>
          {cart.map((cartItem, idx) => {
            return (
              <div key={idx} className="flex justify-between mb-4">
                <div>{cartItem.item_name}</div>
                <div className="flex gap-2">
                  {/* Quantity Buttons */}
                  <div className="flex border-2 border-gray-300">
                    <button
                      onClick={() => {
                        if (cartItem.count === 1) {
                          removeItem(cartItem._id);
                        }
                        changeQuantity(cartItem._id, 'DECREASE');
                      }}
                      className="px-2 text-red-700 text-lg"
                    >
                      -
                    </button>
                    <p className="pt-1">{cartItem.count}</p>
                    <button
                      onClick={() => changeQuantity(cartItem._id, 'INCREASE')}
                      className="px-2 text-green text-lg"
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-1">₹{cartItem.count * cartItem.price}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xl">
          Total: <span className="text-lg">₹</span> {cartTotal}
        </p>

        <button className="w-full mt-6 px-4 py-3 bg-green text-white hover:shadow-lg text-center">
          <Link href="#">
            <a className="w-full">Checkout</a>
          </Link>
        </button>
      </>
    );
}

export default CartItems