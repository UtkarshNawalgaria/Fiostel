import Head from 'next/head'
import client from '../client'
import {CartContext} from '../utils/cart'
import { useContext } from 'react'

const pageQuery = `
  *[_type == "page" && title == "About Us"][0]
`

const About = ({ pageData }) => {

    const { pageSEO: { title = '', description = ''}, keywords = [] } = pageData
    const {cart} = useContext(CartContext)

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords.join(', ')} />
        </Head>
        <h1>{pageData.title}</h1>
        <h1>{JSON.stringify(cart)}</h1>
      </div>
    );
}

export default About

export async function getStaticProps() {
    const pageData = await client.fetch(pageQuery);

    return {
        props: {
            pageData
        }
    }
}