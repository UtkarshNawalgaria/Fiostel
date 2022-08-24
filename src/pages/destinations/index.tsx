import { Prisma } from '@prisma/client'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import prisma from '../../utils/prisma'

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
  select: destinationSelectFields
})

type Destination = Prisma.DestinationGetPayload<typeof SingleDestinationData>

const DestinationList: React.FC<{ destinations: Destination[] }> = ({ destinations }) => {
  return (
    <section>
      <Head>
        <title>All Destinations | Fiostel Boys PG in Karol Bagh</title>
        <meta name="description" content="" />
      </Head>
      <div className="container mx-auto md:max-w-7xl">
        <h1 className="text-center my-10 text-4xl font-extrabold">
          Destinations
        </h1>
        <div className="grid grid-cols-4 gap-2 mb-10">
          {destinations ? (
            destinations.map((destination) => {
              return (
                <div
                  className="w-full relative"
                  key={destination.slug}
                >
                  <Link href={`/destinations/${destination.slug}`}>
                    <a className="after:content-[''] after:absolute after:inset-0 after:bg-black after:rounded-lg after:opacity-0 after:hover:opacity-10 after:transition-opacity after:delay-100 after:ease-in">
                      <Image
                        src={`${destination?.media?.images[0].url}?h=400`}
                        className="rounded-lg h-[400px] w-[400px]"
                        height={400}
                        width={400}
                      />
                      <p className="text-2xl text-white font-semibold absolute top-[80%] left-[5%]">
                        {destination.name}
                      </p>
                    </a>
                  </Link>
                </div>
              )
            })
          ) : (
            <h2>No Destinations Available</h2>
          )}
        </div>
      </div>
    </section>
  )
}

export async function getStaticProps() {
  const destinations = await prisma.destination.findMany({
    select: destinationSelectFields,
  })

  return {
    props: {
      destinations,
    },
    revalidate: 30,
  }
}

export default DestinationList
