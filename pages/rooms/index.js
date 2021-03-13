import client from '../../client';
import RoomLineItem from '../../components/roomLineItem';

const API_URL = process.env.API_URL;

const Rooms = ({ rooms }) => {
  return (
    <div className="container mx-auto md:max-w-5xl">
      <h1 className="text-center text-4xl font-extrabold my-10">
        DORMS AND ROOMS
      </h1>
      <p className="text-center mx-2">
        We provide rooms of all types to cater to different needs. Three times
        meals, laundry services, housekeeping and other facilities are included
        in the prices for monthly and yearly packages.
      </p>
      <div className="flex flex-col p-2">
        {rooms.map((room) => {
          return <RoomLineItem key={room._id} room={room} />;
        })}
      </div>
    </div>
  );
};

export default Rooms;

export async function getStaticProps() {
  const rooms = await client.fetch(`
                    *[_type == "room"] {
                      _id,
                      title,
                      slug,
                      description,
                      price,
                      "imageUrl": image.asset->url
                    }
                `);

  return {
    props: {
      rooms,
    },
    revalidate: 30,
  };
}
