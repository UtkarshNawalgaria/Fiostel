import Head from 'next/head'

const Contact = () => {
  return (
    <div>
      <Head>
        <title>Contact Us - Fiostel | Boys PG in Karol Bagh</title>
        <meta name="description" content="" />
      </Head>
      <h1>Contact Us</h1>
    </div>
  )
}

export default Contact

export async function getStaticProps() {
  return {
    props: {},
  }
}
