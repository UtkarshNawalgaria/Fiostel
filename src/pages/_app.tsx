import Layout from '../components/layout'
import '../styles/globals.css'
import { CartProvider } from '../utils/cart'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  )
}

export default MyApp
