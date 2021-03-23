import { useEffect, useState, createContext, useContext } from 'react';

const CartContext = createContext()

export const CartProvider = ({children}) => {

  const [cart, setCart] = useState(() => {
    try {
      const data = localStorage.getItem('cart')
      return data ? JSON.parse(data) : []
    } catch (e) {
      return []
    }
  })
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    getTotal();
  }, [cart]);

  const addToCart = (newItem) => {
    setCart((oldCart) => {
      if (oldCart.length === 0) {
        return [{ ...newItem, count: 1 }];
      } else {
        let itemFound = false;

        const newCart = oldCart.map((item) => {
          if (item._id === newItem._id) {
            itemFound = true;
            item.count += 1;
            return item;
          } else {
            return item;
          }
        });
        if (!itemFound) {
          newCart.push({ ...newItem, count: 1 });
        }
        return newCart;
      }
    });
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item._id != id);
    setCart(newCart);
  };

  const changeQuantity = (itemId, type) => {
    switch (type) {
      case 'INCREASE':
        setCart((oldCart) => {
          return oldCart.map((item) =>
            item._id === itemId ? { ...item, count: item.count + 1 } : item
          );
        });

        break;
      case 'DECREASE':
        setCart((oldCart) => {
          return oldCart.map((item) =>
            item._id === itemId ? { ...item, count: item.count - 1 } : item
          );
        });
        break;
    }
  };

  const getTotal = () => {
    let total = cart.reduce((sum, item) => sum + item.price * item.count, 0);
    setCartTotal(total);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        cartTotal,
        changeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
const useCart = () => useContext(CartContext)

export default useCart
