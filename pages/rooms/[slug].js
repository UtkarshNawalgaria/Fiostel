const API_URL = process.env.API_URL

const SingleRoom = ({ room }) => {

    return (
        <div>
            <h1>Room {room.Name}</h1>
        </div>
    )
}

export default SingleRoom

export async function getStaticPaths() {

    const response = await fetch(`${API_URL}/rooms`, {
        "method": "GET",
    })
    const rooms = await response.json()

    const paths = rooms.map( room => ({
        params: { slug: room.slug}
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params
    const response = await fetch(`${API_URL}/rooms/${slug}`, {
        "method": "GET",
    })
    const room = await response.json()

    return {
        props: {
            room
        }
    }
}