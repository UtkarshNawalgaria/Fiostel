import { useEffect, useState } from 'react';

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
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
            item._id === itemId ? { ...item, count: item.count+1 } : item
          );
        });

        break;
      case 'DECREASE':
          setCart((oldCart) => {
            return oldCart.map((item) =>
              item._id === itemId ? { ...item, count: item.count-1 } : item
            );
          });
        break;
    }
  };

  const getTotal = () => {
    let total = cart.reduce((sum, item) => sum + item.price * item.count, 0);
    setCartTotal(total);
  };

  return {
    cart,
    addToCart,
    removeItem,
    cartTotal,
    changeQuantity,
  };
};

export default useCart;
