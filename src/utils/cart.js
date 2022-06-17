import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

function useLocalStorage(key, inital) {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(key)
      if (saved != null) {
        return JSON.parse(saved)
      }
    }

    return inital
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('cart_items', [])
  const [cartTotal, setCartTotal] = useLocalStorage('cart_total', 0)
  const [cartTax, setCartTax] = useLocalStorage('cart_tax', 0)

  useEffect(() => {
    let total = cart.reduce((sum, item) => sum + item.price * item.count, 0)
    setCartTotal(total)
    setCartTax(Math.round(total * 0.18))
  }, [cart])

  const addToCart = (newItem) => {
    setCart((oldCart) => {
      if (oldCart.length === 0) {
        return [{ ...newItem, count: 1 }]
      } else {
        let itemFound = false

        const newCart = oldCart.map((item) => {
          if (item._id === newItem._id) {
            itemFound = true
            item.count += 1
            return item
          } else {
            return item
          }
        })
        if (!itemFound) {
          newCart.push({ ...newItem, count: 1 })
        }
        return newCart
      }
    })
  }

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item._id != id)
    setCart(newCart)
  }

  const changeQuantity = (itemId, type) => {
    switch (type) {
      case 'INCREASE':
        setCart((oldCart) => {
          return oldCart.map((item) =>
            item._id === itemId ? { ...item, count: item.count + 1 } : item
          )
        })

        break
      case 'DECREASE':
        setCart((oldCart) => {
          return oldCart.map((item) =>
            item._id === itemId ? { ...item, count: item.count - 1 } : item
          )
        })
        break
    }
  }

  const emptyCart = () => {
    setCart([])
    setCartTotal(0)
    setCartTax(0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        cartTotal,
        cartTax,
        changeQuantity,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
const useCart = () => useContext(CartContext)

export default useCart
