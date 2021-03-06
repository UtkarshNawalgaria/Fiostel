// Next.js Imports
import Head from 'next/head';
import Image from 'next/image';
import client from '../../client';
import Amenities from '../../components/data/services';
import Divider from '../../components/Divider';
// Components
import ReservationForm from '../../components/Forms/ReservationForm';
import Heading from '../../components/Heading';

export async function getStaticPaths() {
  const rooms = await client.fetch(`*[_type == "room"] { slug }`);

  const paths = rooms.map((room) => ({
    params: { slug: room.slug.current },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const room = await client
    .fetch(
      `*[_type == "room" && slug.current == '${slug}'] {..., "imageUrl": image.asset->url}`
    )
    .then((data) => data[0]);

  return {
    props: {
      room,
    },
  };
}

const SingleRoom = ({ room }) => {
  return (
    <div className="container mx-auto md:max-w-5xl mt-5 px-4">
      <Head>
        <title>{room.title}</title>
        <meta name="description" content={room.description} />
      </Head>
      <section>
        <Image
          src={room.imageUrl}
          layout="responsive"
          width={1024}
          height={500}
          alt={room.image.alt}
          className="rounded-lg"
        />
      </section>
      <section className="pt-6 md:flex">
        <div className="md:w-3/5 md:pr-4">
          <Heading
            type={'h1'}
            title={room.title}
            styles={'text-4xl font-semibold pb-2'}
          />
          <p className="mb-2 text-lg font-bold text-yellow-400">
            Rs. {room.price}{' '}
            <span className="text-gray-500 font-medium">/ month</span>
          </p>
          <Divider />

          <Heading
            type={'h3'}
            title={'Description'}
            styles={'text-2xl mb-4 font-semibold'}
          />
          <p className="mb-4">{room.description}</p>
          <Divider />

          <Heading
            type={'h3'}
            title={'Amenities'}
            styles={'text-2xl mb-4 font-semibold'}
          />
          <div className="grid grid-cols-2 gap-1 md:gap-y-6 mb-4">
            {Amenities.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <div>{item.icon}</div>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
          <Divider />
        </div>
        <div className="md:block hidden w-2/5 h-screen sticky top-0">
          <div className="p-4 shadow-xl rounded-lg">
            <Heading
              type={'h3'}
              title={'Reserve the Room'}
              styles={'text-2xl mb-4 text-center'}
            />
            <ReservationForm roomSlug={room.slug.current} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleRoom;


