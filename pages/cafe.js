import Head from 'next/head';
import client from '../client';

const pageQuery = `
  *[_type == "page" && title == "Cafe"][0]
`;

const Cafe = ({ pageData }) => {

    const {
      pageSEO: { title = '', description = '' }, keywords = []
    } = pageData;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(", ")} />
      </Head>
      <h1>Cafe Page</h1>
    </div>
  );
};

export default Cafe;

export async function getStaticProps() {
  const pageData = await client.fetch(pageQuery);

  return {
    props: {
      pageData,
    },
  };
}
