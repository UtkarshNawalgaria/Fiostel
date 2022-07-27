import Head from 'next/head'
import { useEffect } from 'react'
import useCart from '../context/cart.context'

const Success = () => {
  const data = useCart()

  useEffect(() => {
    data?.emptyCart()
  }, [])

  return (
    <div>
      <Head>
        <title>Order Successful</title>
      </Head>
      <h1>Congratulations, Your Payment Was successfull</h1>
    </div>
  )
}

export default Success
