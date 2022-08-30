import { Prisma } from '@prisma/client'
import React from 'react'
import { MdArrowRightAlt } from 'react-icons/md'
import prisma from '../../../utils/prisma'

const roomSelectFields = {
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
}

const staySelectFields = {
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
}

const stay = Prisma.validator<Prisma.StayArgs>()({
  select: staySelectFields,
})

const room = Prisma.validator<Prisma.RoomArgs>()({
  select: roomSelectFields,
})

type costPerDay = {
  costPerDay: number
}
type Stay = Prisma.StayGetPayload<typeof stay>
type Room = Prisma.RoomGetPayload<typeof room> & costPerDay

const RoomList: React.FC<{ rooms: Room[]; stay: Stay }> = ({ stay, rooms }) => {
  if (rooms.length == 0) {
    return <div>No Rooms Available</div>
  }
  
  return (
    <>
      <section className="mb-5 container mx-auto max-w-7xl md:my-10">
        <div>
          <img
            src={stay.media?.images[0].url}
            alt={stay.name}
            className="w-full h-[300px] md:h-[500px] object-cover md:rounded-lg"
          />
        </div>
        <div className="flex flex-col p-4 md:flex-row md:p-0">
          <div>
            <h1 className="text-5xl font-bold mt-5">{stay.name}</h1>
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-7xl p-4 flex flex-col-reverse gap-4 md:flex-row md:my-10 md:p-0">
        <div className="room-list flex flex-col md:w-3/4">
          {rooms.map((room) => {
            return (
              <div key={room.slug} className="flex flex-col mb-10 md:flex-row">
                <div className="w-[300px]">
                  <img
                    src={room.media?.images[0].url}
                    alt={room.name}
                    className="md:h-[200px] md:rounded-tl-lg md:rounded-bl-lg"
                  />
                </div>
                <div className="w-full border-[#e7e7e7e] flex flex-col justify-between md:px-4 md:border-y md:border-r md:rounded-tr-lg md:rounded-br-lg">
                  <div className="flex justify-between w-full">
                    <h3 className="font-bold text-xl">{room.name}</h3>
                    <div className="font-bold">Rs {room?.costPerDay}</div>
                  </div>
                  <div className='flex justify-end'>
                    <button className="inline-block cursor-pointer bg-[#facc15] text-white my-4 font-semibold px-6 py-2 rounded-md mt-5 hover:text-[#facc15] hover:bg-white border-2 border-[#facc15] focus:outline-none transition ease-in-out duration-100">
                      <span>Book Room</span>
                      <MdArrowRightAlt className="inline-block ml-2 text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="md:w-1/4">Calendar</div>
      </section>
    </>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params

  const stay = await prisma.stay.findUnique({
    where: {
      slug: slug,
    },
    select: staySelectFields,
  })

  const rooms = await prisma.room
    .findMany({
      where: {
        stayId: stay?.id,
      },
      select: roomSelectFields,
    })
    .then((data) => {
      return data.map((room) => ({
        ...room,
        costPerDay: room.costPerDay.toNumber(),
      }))
    })

  return {
    props: {
      stay,
      rooms: rooms.length > 0 ? rooms : [],
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
