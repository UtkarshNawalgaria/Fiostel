import React from 'react'
import { modifyRoomData } from '../../../utils/common'
import prisma from '../../../utils/prisma'

const RoomList: React.FC<{ rooms: any }> = ({ rooms }) => {
  return <div>RoomList</div>
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params

  const stay = await prisma.stay.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
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
            }
          },
        }
      }
    }
  })

  return {
    props: {
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
