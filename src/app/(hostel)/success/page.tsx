'use client'

import { useEffect } from 'react'
import useCart from '../../../context/cart.context'

export default function SuccessPage() {
  const data = useCart()

  useEffect(() => {
    data?.emptyCart()
  }, [])

  return (
    <div>
      <h1>Congratulations, Your Payment Was successful</h1>
    </div>
  )
}
