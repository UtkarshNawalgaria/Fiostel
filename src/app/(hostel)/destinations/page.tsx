import { Prisma } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '../../../utils/prisma'
import { Metadata } from 'next'

const destinationSelectFields = {
  id: true,
  slug: true,
  name: true,
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

const SingleDestinationData = Prisma.validator<Prisma.DestinationArgs>()({
  select: destinationSelectFields,
})

export const metadata: Metadata = {
  title: 'All Destinations | Fiostel Boys PG in Karol Bagh',
}

export default async function DestinationListPage() {
  const destinations = await prisma.destination.findMany({
    select: destinationSelectFields,
  })

  return (
    <section>
      <div className="container mx-auto md:max-w-7xl">
        <h1 className="text-center my-10 text-4xl font-extrabold">
          Destinations
        </h1>
        <div className="grid grid-cols-4 gap-2 mb-10">
          {destinations ? (
            destinations.map((destination) => {
              return (
                <div className="w-full h-[400px] relative" key={destination.slug}>
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="before:content-[''] before:absolute before:inset-0 before:bg-black before:rounded-lg before:opacity-0 before:hover:opacity-10 before:transition-opacity before:delay-100 before:ease-in"
                  >
                    <Image
                      src={`${destination?.media?.images[0].url}?h=400`}
                      className="rounded-lg h-full w-full"
                      height={400}
                      width={400}
                      alt=""
                    />
                    <p className="text-2xl text-white font-semibold absolute top-[80%] left-[5%]">
                      {destination.name}
                    </p>
                  </Link>
                </div>
              )
            })
          ) : (
            <h2 className="my-10 text-center text-2xl font-semibold">
              No Destinations Available
            </h2>
          )}
        </div>
      </div>
    </section>
  )
}
