import React from 'react'
import { modifyRoomData } from '../../../utils/common'
import prisma from '../../../utils/prisma'

const RoomList: React.FC<{ rooms: any; stay: any }> = ({ stay, rooms }) => {

  if (rooms.length == 0) {
    return <div>No Rooms Available</div>
  }

  return (
    <section className="mb-5 container mx-auto max-w-7xl md:my-10">
      <div className="">
        <img
          src={stay.media?.images[0].url}
          alt={stay.name}
          className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col md:flex-row">
        <div>
          <h1 className='text-5xl font-bold mt-5'>{stay.name}</h1>
        </div>
      </div>
      <div className="room-list">
        
      </div>
    </section>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params

  const stay = await prisma.stay.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      description: true,
      media: {
        include: {
          images: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      },
    },
  })

  const rooms = await prisma.room.findMany({
    where: {
      stayId: stay?.id,
    },
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
            },
          },
        },
      },
    },
  })

  return {
    props: {
      stay,
      rooms: rooms.length > 0 ? modifyRoomData(rooms) : [],
    },
  }
}

export async function getStaticPaths() {
  const stays = await prisma.stay.findMany({
    select: {
      slug: true,
    },
  })

  const paths = stays?.map((stay) => ({
    params: { slug: stay.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default RoomList
