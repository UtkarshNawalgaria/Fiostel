import RoomLineItem from '../../components/roomLineItem'

const API_URL = 'https://creator.zoho.in/api/v2/sharad.n/'
const API_KEY = process.env.API_KEY

const Rooms = ({ rooms }) => {
    return (
        <div className="container mx-4 md:container md:mx-auto md:w-max-3xl">
            <h1 className="text-center">All Rooms Page</h1>
            <div className="flex flex-col p-2">
                {rooms.map(room => {
                    return (<RoomLineItem key={room.ID} room={room} />)
                })}
            </div>
        </div>
    )
}

export default Rooms

export async function getStaticProps() {

    const response = await fetch(`${API_URL}hostel-management/report/All_Room_Types`, {
        "method": "GET",
        "headers": {
            "Authorization": `Zoho-oauthtoken ${API_KEY}`
        }
    })
    const rooms = await response.json()

    return {
        props: {
            rooms: rooms.data
        }
    }
}