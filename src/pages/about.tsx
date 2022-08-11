import Head from 'next/head'
import Image from 'next/image'
import Heading from '../components/Heading'

const About = () => {
  return (
    <div>
      <Head>
        <title>About Us | Fiostel - Boys PG in Karol Bagh</title>
        <meta name="description" content="" />
      </Head>
      <section className="max-container max-w-4xl py-20 mb-0">
        <div className="flex flex-col justify-center items-center">
          <Heading
            type="h1"
            title="Our Journey"
            styles="text-center text-4xl font-semibold uppercase pb-4"
          />
          <div className="h-1 w-8 bg-black"></div>
          <div className="text-gray-700">
            <p className="text-justify pt-10 pb-4">
              Started off in May 2016 as a back-packer’s and traveler’s hostel,
              Fiostel grew to host UPSC students. Realising the growing need of
              the youth to live in a new age hostel/ PG which would be more
              aesthetic, with better architectural planning and larger living
              areas yet budget friendly, something that we found was missing in
              Karol Bagh. Our focus point is on providing a peaceful environment
              which would let the students focus on what’s most important, their
              studies, and leave the rest to us.
            </p>
            <p className="text-justify pb-4">
              With a range of accommodating 100 members, Fiostel received
              splendid response and was running to it’s full capacity from it’s
              very first month. In 2017, we further grew to establish our own
              in-house cafe to provide a healthier and a wider food choice.
            </p>
            <p className="text-justify pb-4">
              On receiving multiple inquiries, in 2018 we began to cater to
              other Pgs and coaching institutions in Karol Bagh and today, are
              feeding 300 students, nourishing, pure vegetarian-home-like-food.
              Our new venture began the creation of what we now call
              “Ghar-wali-thaali”.
            </p>
            <p className="text-justify">
              Fiostel is an accommodation for boys which provides a warm
              atmosphere with a team always in pursuit of continuous
              improvement. One where you discover and learn, with like minded
              people, one where you grow and live an experience, one which feels
              like home.
            </p>
          </div>
        </div>
      </section>

      <section className="max-container">
        <div className="flex flex-col justify-center items-center mb-10">
          <Heading
            type="h2"
            title="How close are we ?"
            styles="text-center text-3xl font-semibold uppercase pb-4"
          />
          <div className="h-1 w-8 bg-black"></div>
        </div>
        <div className="mb-10 md:flex">
          <div className="md:flex-1">
            <Image
              src="/media/metro.jpg"
              width={500}
              height={450}
              alt="Metro near Fiostel"
            />
          </div>
          <div className="md:pl-10 md:flex-1">
            <span className="text-8xl font-semibold text-yellow-300 pb-5">
              01
            </span>
            <h3 className="text-3xl font-semibold text-gray-800 pt-5">
              Karol Bagh
            </h3>
            <h3 className="text-3xl font-semibold text-gray-800">Metro</h3>
            <h3 className="text-3xl font-semibold text-gray-800">Station</h3>
            <div className="h-1 w-8 bg-gray-700 mt-10"></div>
            <p className="mt-10 font-thin pr-20 text-gray-700">
              Fiostel is located at a 400m distance from Karol Bagh Metro
              Station and is a 5 minute walk, making travel to and from Fiostel
              easy and convenient.
            </p>
          </div>
        </div>
        <div className="mb-10 flex flex-col-reverse md:flex md:flex-row">
          <div className="md:pr-10 md:flex-1">
            <span className="text-8xl font-semibold text-yellow-300 pb-5">
              02
            </span>
            <h3 className="text-3xl font-semibold text-gray-800 pt-5">
              All Major IAS
            </h3>
            <h3 className="text-3xl font-semibold text-gray-800">Institutes</h3>
            <div className="h-1 w-8 bg-gray-700 mt-10"></div>
            <p className="mt-10 font-light pr-20 text-gray-700 break-normal">
              Karol Bagh is the hub of IAS Institutions, where students from all
              over the country come to study. We’re located at a walking
              distance close to all major IAS Institutions.
            </p>
          </div>
          <div>
            <Image
              src="/media/students.jpg"
              width={500}
              height={450}
              alt="IAS Institutes near Fiostel"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

export async function getStaticProps() {
  return {
    props: {},
  }
}
