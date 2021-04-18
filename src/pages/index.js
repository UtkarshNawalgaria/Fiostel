import Head from 'next/head';
import Image from 'next/image';
import client from '../client';
import Button from '../components/Button';
import Heading from '../components/Heading';

export async function getStaticProps() {
  const siteSettings = await client.fetch(`*[_type == 'siteSettings'][0]`);

  return {
    props: {
      siteSettings,
    },
  };
}

export default function Home({ siteSettings }) {
  return (
    <div>
      <Head>
        <title>{siteSettings.title}</title>
        <meta name="description" content={siteSettings.description} />
      </Head>
      <section className="bg-hero-image bg-no-repeat bg-cover bg-center py-5 md:py-0">
        <div className="max-container md:flex md:pt-40 md:pb-60">
          <div>
            <h1 className="text-3xl py-10 font-semibold md:text-6xl">
              Book Your Room
            </h1>
            <Button
              title="View Rooms"
              styles="py-4 px-6 rounded-lg bg-yellow-400 font-semibold hover:bg-yellow-500 hover:shadow-md transition duration-300 ease-in-out"
              link="/rooms"
            />
          </div>
        </div>
      </section>

      <section className="max-container mt-5 mb-10 py-5">
        <div className="w-75 p-10 bg-yellow-400 rounded-3xl">
          <Heading
            type="h2"
            title={'Home away from home;'}
            styles="text-3xl font-semibold mb-5"
          />
          <p>
            A place where one is as happy, relaxed, or comfortable as in one’s
            own home. An accommodation for boys which provides a warm atmosphere
            with a team always in pursuit of continuous improvement. One where
            you discover and learn, with like minded people, one where you grow
            and live an experience, one which feels like home.
          </p>
        </div>
      </section>

      <section className="max-container pt-5 md:pt-20 md:flex">
        <div className="md:w-1/2">
          <Image
            src="/media/cafe_image.jpg"
            width={600}
            height={500}
            objectFit="true"
            alt="Fiostel Cafe"
          />
        </div>
        <div className="md:w-1/2 md:px-10">
          <div className="text-center md:mr-5 mt-5 md:mt-0">
            <Image src="/media/cafe-logo.png" width={150} height={100} alt="Fiostel Cafe Logo"/>
          </div>
          <div>
            <p className="my-5">
              Hot parathas with butter and curd, a cup of kadak chai with toast,
              makhani dal and jeera rice?
            </p>
            <p className="">
              ​Fiostel brings you pure vegetarian and freshly cooked healthy
              food which leaves you licking your fingers. Chatting and bonding
              over coffee and bread pakoda, watch your favourite movies and the
              next cricket match in what feels like your very own home theatre,
              only in Fiostel Cafe.
            </p>
          </div>
          <div className="flex justify-center pt-10">
            <Button
              title="Order Now"
              link="/cafe"
              styles="py-4 px-8 bg-yellow-300 rounded-full hover:shadow-lg hover:bg-yellow-400 transition duration-300 ease-in-out"
            />
          </div>
        </div>
      </section>

      <section className="max-container pt-5 flex flex-col-reverse pb-5 md:pt-20 md:flex md:flex-row">
        <div className="md:w-1/2 md:pb-10 md:pr-10">
          <div>
            <Heading
              type="h3"
              title="FEEL LIKE HOME"
              styles="text-4xl font-semibold text-yellow-400 mb-10 text-center pt-5 md:pt-0 md:text-left"
            />
            <p className="">
              ​Fiostel brings you pure vegetarian and freshly cooked healthy
              food which leaves you licking your fingers. Chatting and bonding
              over coffee and bread pakoda, watch your favourite movies and the
              next cricket match in what feels like your very own home theatre,
              only in Fiostel Cafe.
            </p>
          </div>
          <div className="flex justify-center md:flex-none md:justify-start pt-10">
            <Button
              title="About Us"
              link="/about"
              styles="py-4 px-8 bg-yellow-300 rounded-full hover:shadow-lg hover:bg-yellow-400 transition duration-300 ease-in-out"
            />
          </div>
        </div>

        <div className="md:w-1/2">
          <Image
            src="/media/fiostel_home.jpg"
            width={700}
            height={600}
            objectFit="true"
            alt="Life at Fiostel"
          />
        </div>
      </section>
    </div>
  );
}
