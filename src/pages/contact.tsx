import Head from 'next/head'

import client from '../client'

const pageQuery = `
  *[_type == "page" && title == "Contact Us"][0]
`

const Contact = ({ pageData }) => {
  const {
    pageSEO: { title = '', description = '' },
    keywords = [],
  } = pageData

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
      </Head>
      <h1>{pageData.title}</h1>
    </div>
  )
}

export default Contact

export async function getStaticProps() {
  const pageData = await client.fetch(pageQuery)

  return {
    props: {
      pageData,
    },
  }
}
