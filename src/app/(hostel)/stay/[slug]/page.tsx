import prisma from '../../../../utils/prisma'
import RoomList, { TRoom, TStay } from '../room-list'

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
  slug: true,
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

export default async function StayPage({
  params,
}: {
  params: { slug: string }
}) {
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

  return (
    <>
      <RoomList rooms={rooms as TRoom[]} stay={stay as TStay} />
    </>
  )
}
