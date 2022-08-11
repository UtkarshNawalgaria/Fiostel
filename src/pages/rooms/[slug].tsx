import Head from 'next/head'
import Image from 'next/image'
import Amenities from '../../components/data/services'
import Divider from '../../components/Divider'

import ReservationForm from '../../components/Forms/ReservationForm'
import Heading from '../../components/Heading'
import Service from '../../components/Service'
import prisma from '../../utils/prisma'
import { modifyRoomData } from '../../utils/common'
import superjson from 'superjson'

export async function getStaticPaths() {
  const rooms = await prisma.room.findMany({
    select: {
      slug: true,
    },
  })

  const paths = rooms?.map((room) => ({
    params: { slug: room.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params
  const room = await prisma.room.findUnique({
    where: {
      slug: slug,
    },
    include: {
      media: {
        include: {
          images: true,
        },
      },
    },
  })
  const rooms = await modifyRoomData([room])

  return {
    props: {
      room: superjson.stringify(rooms[0]),
    },
  }
}

const SingleRoom: React.FC<{ room: string }> = ({ room }) => {
  const parsedRoom: any = superjson.parse(room)

  return (
    <div className="container mx-auto md:max-w-5xl mt-5 px-4">
      <Head>
        <title>{parsedRoom.name}</title>
        <meta name="description" content={parsedRoom.description} />
      </Head>
      <section>
        <Image
          src={parsedRoom.media.images[0].url}
          layout="responsive"
          width={1024}
          height={500}
          alt={parsedRoom.name}
          className="rounded-lg"
        />
      </section>
      <section className="pt-6 md:flex">
        <div className="md:w-3/5 md:pr-4">
          <Heading
            type={'h1'}
            title={parsedRoom.name}
            styles={'text-4xl font-semibold pb-2'}
          />
          <p className="mb-2 text-lg font-bold text-gray-700">
            Rs. {parsedRoom.costPerDay}{' '}
            <span className="text-gray-700 font-medium">/ month</span>
          </p>
          <Divider />

          <Heading
            type={'h3'}
            title={'Description'}
            styles={'text-2xl mb-4 font-semibold'}
          />
          <p className="mb-4">{parsedRoom.description}</p>
          <Divider />

          <Heading
            type={'h3'}
            title={'Amenities'}
            styles={'text-2xl mb-4 font-semibold'}
          />
          <div className="grid grid-cols-2 gap-1 md:gap-y-6 mb-4">
            {Amenities.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <div>
                  <Service icon={item.icon} />
                </div>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
          <Divider />
        </div>
        <div className="md:block hidden w-2/5 h-screen sticky top-0">
          <div className="p-4 shadow-xl rounded-lg">
            <Heading
              type={'h3'}
              title={'Reserve the Room'}
              styles={'text-2xl mb-4 text-center'}
            />
            <ReservationForm />
          </div>
        </div>
      </section>
    </div>
  )
}

export default SingleRoom
