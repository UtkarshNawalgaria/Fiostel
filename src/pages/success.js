import Head from 'next/head'
import { useEffect } from 'react'
import useCart from '../utils/cart'

const Success = () => {
    const { emptyCart } = useCart()

    useEffect(() => {
        emptyCart()
    }, [])

    return (
        <div>
            <Head>
                <title>Order Successfull</title>
            </Head>
            <h1>Congratulations, Your Payment Was successfull</h1>
        </div>
    )
}

export default Success
