import useCart from '../utils/cart'

const CartItems = () => {
  const { cart, changeQuantity, removeItem } = useCart()

  return (
    <>
      <div>
        {cart.map((cartItem: any, idx: number) => {
          return (
            <div key={idx} className="flex justify-between mb-4">
              <div>{cartItem.item_name}</div>
              <div className="flex gap-2">
                {/* Quantity Buttons */}
                <div className="flex border-2 border-gray-300">
                  <button
                    onClick={() => {
                      if (cartItem.count === 1) {
                        removeItem(cartItem._id)
                      }
                      changeQuantity(cartItem._id, 'DECREASE')
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
          )
        })}
      </div>
    </>
  )
}

export default CartItems
