import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import CartItems from '../components/CartItems'
import useCart from '../utils/cart';

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const publicClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATASET,
  useCdn: false,
});

const builder = imageUrlBuilder(publicClient);
const urlFor = (source) => builder.image(source);

const Cafe = ({ pageData, categories, items }) => {

  const {
    pageSEO: { title = '', description = '' },
    keywords = [],
  } = pageData
  const { cart, addToCart } = useCart()

  const [menuItems, setMenuItems] = useState(items);
  const [currCategory, setCurrCategory] = useState(categories[0].title);
  const [loading, setLoading] = useState(false);

  async function getMenuItems(e, id) {
    setLoading(true)
    const nitems = await publicClient.fetch(
      `*[_type == 'item' && category._ref == "${id}"]`
    );
    setLoading(false)
    setMenuItems(nitems);
  }

  return (
    <div className="container mx-auto my-10">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
      </Head>
      <section className="mb-10 text-center">
        <h1 className="text-6xl">Fiostel Cafe</h1>
      </section>

      <section className="flex">
        {/* Menu Item Categories */}
        <aside className="w-1/5 text-right py-6 border-r-2 h-screen sticky top-0">
          {categories.map((category, idx) => {
            return (
              <div
                key={idx}
                className="mb-2 border-r-4 border-yellow-300 border-transparent border-opacity-0 hover:border-r-4 hover:border-yellow-300"
              >
                <button
                  onClick={(e) => {
                    setCurrCategory(category.title);
                    getMenuItems(e, category._id);
                  }}
                  className="pr-2"
                >
                  {category.title}
                </button>
              </div>
            );
          })}
        </aside>

        {/* Menu Items */}
        <section className="w-3/5 p-6">
          <h2 className="text-4xl mb-10">{currCategory}</h2>
          {loading ? (
            <h1>Items Loading</h1>
          ) : (
            <>
              {menuItems.map((item, idx) => {
                return (
                  <div key={idx}>
                    <div className="flex pb-4 mb-4 border-b-2">
                      {/* Food Image */}
                      <div className="w-auto">
                        <Image
                          src={urlFor(item.image).url()}
                          height={150}
                          width={150}
                          objectFit="cover"
                          className="rounded-lg"
                          alt={item.image.alt}
                        />
                      </div>

                      {/* Food Details */}
                      <div className="flex flex-col px-4 w-2/3">
                        <h3 className="text-lg font-semibold -mt-1">
                          {item.item_name}
                        </h3>
                        <p>Rs. {item.price}</p>
                        <p className="mt-2 text-gray-500">Description</p>
                      </div>

                      {/* Add to Cart button */}
                      <div className="w-1/3 text-center">
                        <button
                          className="px-4 py-2 bg-green text-white hover:shadow-lg"
                          onClick={(e) => addToCart(item)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </section>

        {/* Cart Section */}
        <div className="w-1/5 py-6 ml-2 h-screen sticky top-0">
          {cart.length === 0 ? (
            <h3 className="text-4xl mb-10">Your Cart is Empty</h3>
          ) : (
            <CartItems />
          )}
        </div>
      </section>
    </div>
  );
};

export default Cafe;

export async function getStaticProps() {
  const client = sanityClient({
    projectId: process.env.PROJECT_ID,
    dataset: process.env.DATASET,
    useCdn: false,
  });

  const pageData = await client.fetch(`
    *[_type == "page" && title == "Cafe"][0]
  `);

  const categories = await client.fetch(
    '*[_type == "category"] | order(order)'
  );

  const items = await client.fetch(
    `*[_type == 'item' && category._ref == "${categories[0]._id}"]`
  );

  return {
    props: {
      categories,
      items,
      pageData,
    },
  };
}
