import Image from 'next/image'

const RoomLineItem = ({ key, room }) => {
    return (
        <div key={key}>
            <Image src={`https://creator.zoho.in${room.Room_Image}`} width={200} height={200} />
        </div>
    )
}

export default RoomLineItem
