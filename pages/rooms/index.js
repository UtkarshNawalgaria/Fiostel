import Head from 'next/head';
import client from '../../client';
import RoomLineItem from '../../components/RoomLineItem';

const roomsQuery = `
  *[_type == "room"] {
      _id,
      title,
      slug,
      description,
      price,
      "imageAlt": image.alt,
      "imageUrl": image.asset->url
  }
`;

const pageQuery = `
  *[_type == "page" && title == "Rooms"][0]
`;

const Rooms = ({ rooms, pageData }) => {
  const {
    pageSEO: { title = '', description = '' }, keywords = []
  } = pageData;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
      </Head>

      <div className="container mx-auto md:max-w-5xl">
        <h1 className="text-center text-4xl font-extrabold my-10">
          DORMS AND ROOMS
        </h1>
        <p className="text-center mx-2">
          We provide rooms of all types to cater to different needs. Three times
          meals, laundry services, housekeeping and other facilities are
          included in the prices for monthly and yearly packages.
        </p>
        <div className="flex flex-col p-2">
          {rooms ? (
            rooms.map((room) => {
              return <RoomLineItem key={room._id} room={room} />;
            })
          ) : (
            <h1> No Rooms Available </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;

export async function getStaticProps() {
  const rooms = await client.fetch(roomsQuery);
  const pageData = await client.fetch(pageQuery);

  return {
    props: {
      rooms,
      pageData,
    },
    revalidate: 30,
  };
}
