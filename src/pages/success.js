import React from 'react'
import useCart from '../utils/cart'

const Success = () => {
    const { emptyCart } = useCart()
    React.useEffect(() => {
        emptyCart()
    }, [])

    return (
        <div>
            <h1>Congratulations, Your Payment Was successfull</h1>
        </div>
    )
}

export default Success
