import Link from 'next/link'
import prisma from '../../../../utils/prisma'
import { MdArrowRightAlt } from 'react-icons/md'

const destinationSelectFields = {
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
  stays: {
    select: {
      id: true,
      slug: true,
      name: true,
      shortDescription: true,
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
      rooms: {
        select: {
          costPerDay: true,
        },
      },
    },
  },
}

export default async function SingleDestinationPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  const destination = await prisma.destination.findUnique({
    where: {
      slug: slug,
    },
    include: destinationSelectFields,
  })

  if (destination?.stays) {
    destination.stays = destination?.stays.map((stay) => {
      const roomPrices = stay.rooms.map((room) => room.costPerDay.toNumber())
      const minPrice = Math.min(...roomPrices)

      return {
        ...stay,
        minPrice: isFinite(minPrice) ? minPrice : 0,
      }
    })
  }

  return (
    <>
      <section className="destination-hero container mx-auto max-w-7xl">
        <div className="page-header">
          <h1 className="text-center font-bold text-3xl my-10">
            Welcome to{' '}
            <span className="text-4xl block mt-2 font-extrabold text-[#facc15]">
              {destination?.name}
            </span>
          </h1>
        </div>
        <div className="description mb-10 px-6 md:w-2/3 md:mx-auto md:px-0">
          <p className="text-justify md:text-center">
            {destination?.description}
          </p>
        </div>
        <div className="stay-list flex flex-col items-start">
          {destination?.stays ? (
            destination.stays.map((stay) => {
              return (
                <div
                  className="stay-card mx-6 my-10 flex flex-col shadow-lg rounded-lg relative md:rounded-none md:w-full md:shadow-none md:px-0 md:flex-row md:gap-0 md:items-center"
                  key={stay.slug}
                >
                  <div className="w-full md:max-w-2xl bg-subtitle">
                    <img
                      src={stay.media?.images[0].url + '?w=500'}
                      alt={stay.name}
                      className="md:h-96 object-cover object-center rounded-t-lg md:rounded-lg w-full"
                    />
                  </div>
                  <div className="stay-data p-4 text-center md:w-1/2 md:relative md:text-left md:shadow-md md:h-2/3 md:rounded-lg md:bg-light">
                    <Link
                      href={`/stay/${stay.slug}`}
                      className="text-xl font-bold mb-4 md:text-3xl"
                    >
                      {stay.name}
                    </Link>
                    <p className="mt-5 font-medium text-gray-500 md:w-3/4">
                      {stay.shortDescription}
                    </p>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      {/* @ts-ignore */}
                      <div className={stay.minPrice ? 'block' : 'hidden'}>
                        {/* @ts-ignore */}
                        <p className="font-semibold text-base">
                          Starting from <span className="text-xl">Rs 560</span>
                        </p>
                      </div>
                      <Link
                        href={`/stay/${stay.slug}`}
                        className="inline-block cursor-pointer bg-[#facc15] text-white my-4 font-semibold px-6 py-2 rounded-md mt-5 hover:text-[#facc15] hover:bg-white border-2 border-[#facc15] focus:outline-none transition ease-in-out duration-100"
                      >
                        <span>View</span>
                        <MdArrowRightAlt className="inline-block ml-2 text-xl" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div>No Stays Available</div>
          )}
        </div>
      </section>
    </>
  )
}
