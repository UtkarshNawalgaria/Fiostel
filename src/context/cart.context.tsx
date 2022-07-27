import { createContext, useContext, useEffect, useState } from 'react'

interface ICartItem {
  price: number
  count: number
  _id: string
}

type CartContextType = {
  cart: ICartItem[]
  cartTotal: number
  cartTax: number
  addToCart: (item: ICartItem) => void
  removeItem: (id: string) => void
  changeQuantity: (itemId: string, type: string) => void
  emptyCart: () => void
}

function useLocalStorage<Type>(key: string, inital: Type) {
  const [value, setValue] = useState<Type>(() => {
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

  return { value, setValue }
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: any) => {
  const { value: cart, setValue: setCart } = useLocalStorage<ICartItem[]>(
    'cart_items',
    []
  )
  const { value: cartTotal, setValue: setCartTotal } = useLocalStorage<number>(
    'cart_total',
    0
  )
  const { value: cartTax, setValue: setCartTax } = useLocalStorage<number>(
    'cart_tax',
    0
  )

  useEffect(() => {
    let total = cart.reduce(
      (sum: number, item: ICartItem) => sum + item.price * item.count,
      0
    )
    setCartTotal(total)
    setCartTax(Math.round(total * 0.18))
  }, [cart])

  const addToCart = (newItem: ICartItem) => {
    setCart((oldCart: ICartItem[]) => {
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

  const removeItem = (id: string) => {
    const newCart = cart.filter((item: ICartItem) => item._id != id)
    setCart(newCart)
  }

  const changeQuantity = (itemId: string, type: string) => {
    switch (type) {
      case 'INCREASE':
        setCart((oldCart: ICartItem[]) => {
          return oldCart.map((item) =>
            item._id === itemId ? { ...item, count: item.count + 1 } : item
          )
        })

        break
      case 'DECREASE':
        setCart((oldCart: ICartItem[]) => {
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
        cartTotal,
        cartTax,
        addToCart,
        removeItem,
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
