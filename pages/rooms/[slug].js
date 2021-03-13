import client from '../../client'
const SingleRoom = ({ room }) => {
  return (
    <div>
      <h1>Room {room.title}</h1>
    </div>
  );
};

export default SingleRoom;


export async function getStaticPaths() {
  const rooms = await client.fetch(`*[_type == "room"] { slug }`)

  const paths = rooms.map((room) => ({
    params: { slug: room.slug.current },
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const room = await client.fetch(`*[_type == "room" && slug.current == '${slug}']`)
                            .then( data => data[0])

  console.log(room)
  return {
    props: {
      room,
    },
  };
}
