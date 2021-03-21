import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link'

import React, { useEffect, useState } from 'react';
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

const Cafe = ({ pageData, categories }) => {
  const {
    pageSEO: { title = '', description = '' },
    keywords = [],
  } = pageData;
  const [menuItems, setMenuItems] = useState([]);
  const [currCategory, setCurrCategory] = useState('');
  const { cart, addToCart, removeItem, changeQuantity, cartTotal } = useCart();

  useEffect(async () => {
    const items = await publicClient.fetch(
      `*[_type == 'item' && category._ref == "${categories[0]._id}"]`
    );
    setCurrCategory(categories[0].title);
    setMenuItems(items);
  }, []);

  async function getMenuItems(e, id) {
    const items = await publicClient.fetch(
      `*[_type == 'item' && category._ref == "${id}"]`
    );
    setMenuItems(items);
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
        </section>

        {/* Cart Section */}
        <div className="w-1/5 py-6 ml-2 h-screen sticky top-0">
          {cart.length === 0 ? (
            <h3 className="text-4xl mb-10">Your Cart is Empty</h3>
          ) : (
            <>
              <h3 className="text-4xl mb-10">Cart</h3>
              <div>
                {cart.map((cartItem, idx) => {
                  return (
                    <div key={idx} className="flex justify-between mb-4">
                      <div>{cartItem.item_name}</div>
                      <div className="flex gap-2">
                        {/* Quantity Buttons */}
                        <div className="flex border-2 border-gray-300">
                          <button
                            onClick={() => {
                              if (cartItem.count === 1) {
                                removeItem(cartItem._id);
                              }
                              changeQuantity(cartItem._id, 'DECREASE');
                            }}
                            className="px-2 text-red-700 text-lg"
                          >
                            -
                          </button>
                          <p className="pt-1">{cartItem.count}</p>
                          <button
                            onClick={() =>
                              changeQuantity(cartItem._id, 'INCREASE')
                            }
                            className="px-2 text-green text-lg"
                          >
                            +
                          </button>
                        </div>
                        <p className="mt-1">
                          ₹{cartItem.count * cartItem.price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-xl">
                Total: <span className="text-lg">₹</span> {cartTotal}
              </p>

              <button className="w-full mt-6 px-4 py-3 bg-green text-white hover:shadow-lg text-center">
                <Link href="#">
                  <a className="w-full">Checkout</a>
                </Link>
              </button>
            </>
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

  return {
    props: {
      categories,
      pageData,
    },
  };
}
