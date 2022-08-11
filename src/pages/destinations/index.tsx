import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import prisma from '../../utils/prisma'

const DestinationList: React.FC<{ destinations: any}> = ({ destinations }) => {
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
            destinations.map((destination: any) => {
              return (
                <div className="w-full" key={destination.slug}>
                  <Link href={`/destinations/${destination.slug}`}>
                    <a>
                      <Image
                        src={`${destination.media.images[0].url}?h=400`}
                        className="rounded-lg"
                        height={400}
                        width={400}
                      />
                      <p className="text-2xl font-semibold">{destination.name}</p>
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
    select: {
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
    },
  })

  return {
    props: {
      destinations,
    },
  }
}

export default DestinationList
