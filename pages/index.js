import Head from 'next/head'
import client from '../client'


export default function Home({ siteSettings }) {

  return (
    <div>
      <Head>
        <title>{siteSettings.title}</title>
        <meta name="description" content={siteSettings.description}/>
      </Head>
      <h1>Home Page</h1>
    </div>
  )
}

export async function getStaticProps() {
  const [siteSettings] = await client.fetch(`*[_type == 'siteSettings']`);

  return {
    props: {
      siteSettings
    }
  }
}
