import React from 'react'
import useCart from '../utils/cart'
import Head from 'next/head'

const Success = () => {
    const { emptyCart } = useCart()
    React.useEffect(() => {
        emptyCart()
    }, [])

    return (
        <div>
            <Head>
                <title>Order Successful Page</title>
            </Head>
            <h1>Congratulations, Your Payment Was successfull</h1>
        </div>
    )
}

export default Success
