import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Services from '../../components/data/services'
import Service from '../../components/Service'
import prisma from '../../utils/prisma'
import { modifyRoomData } from '../../utils/common'

type Room = {
  id: number
  slug: string
  name: string
  description: string
  costPerMonth: number
  media: {
    id: string
    images: Array<{
      id: string
      publicId: string
      url: string
    }>
  }
}


const RoomLineItem = ({ room }: any) => {
  return (
    <section className="room-line-item my-6 p-2 border border-gray-200 rounded-lg md:flex md:flex-1">
      <div className="h-96 w-full md:h-60 md:w-60 md:flex-none relative">
        <Image
          src={room.media?.images[0]?.url}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          alt={room.name}
          height={240}
          width={240}
        />
      </div>
      <div className="mt-3 md:flex md:flex-col md:justify-between md:pl-4 md:pr-2 md:mt-0">
        <div className="md:flex md:flex-col md:mt-0">
          {/* Room Name */}
          <Link href={`/rooms/${room.slug}`}>
            <a className="text-3xl font-semibold mb-1 md:mt-0 md:mb-2">
              {room.name}
            </a>
          </Link>
          <p className="mb-5 text-lg font-semibold text-gray-700 py-1 md:hidden">
            Rs {room.costPerDay} / month
          </p>
          <p className='room-description w-3/4'>{room.description}</p>
          <div className="services mt-4 flex justify-items-center">
            {Services.map((item, idx) => (
              <div key={idx} className="mr-4 align-center">
                <Service icon={item.icon} isSmall={true} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:flex md:flex-col md:justify-between md:flex-none">
        <p className="text-lg font-semibold text-gray-700 pt-1 hidden md:block">
          Rs {room.costPerDay} / night
        </p>
        <div>
          <Link href={`/rooms/${room.slug}`}>
            <button className="p-3 mt-4 bg-yellow-400 rounded-md font-medium md:mx-2">
              More Info
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

const Rooms = ({ rooms }: {rooms: Room[]}) => {

  return (
    <section>
      <Head>
        <title>All Rooms | Fiostel Boys PG in Karol Bagh</title>
        <meta name="description" content="" />
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
              return <RoomLineItem key={room.id} room={room} />
            })
          ) : (
            <h1> No Rooms Available </h1>
          )}
        </div>
      </div>
    </section>
  )
}

export async function getStaticProps() {
  const rooms = await modifyRoomData(
    await prisma.room.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        costPerDay: true,
        media: {
          include: {
            images: {
              select: {
                id: true,
                url: true,
              }
            },
          }
        }
      }
    })
  )

  return {
    props: {
      rooms,
    },
    revalidate: 30,
  }
}

export default Rooms
