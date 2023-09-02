'use client'

import { useEffect, useState } from 'react'
import useCart, { CartContextType } from '../../../context/cart.context'
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import CartItems from '../../../components/CartItems'
import Link from 'next/link'

export type Slug = {
  _type: string
  current: string
}

export type TMetadata = {
  _id: string
  _createdAt: string
  _rev: string
  _type: string
  _updatedAt: string
  slug: Slug
}

export type Category = TMetadata & {
  order: number
  title: string
}

export type TItem = TMetadata

const publicClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATASET,
  useCdn: false,
})

const builder = imageUrlBuilder(publicClient)
const urlFor = (source: string) => builder.image(source)

async function fetchCategories() {
  const categories = (await publicClient.fetch(
    '*[_type == "category"] | order(order)'
  )) as Category[]

  return categories
}

async function fetchItems(categoryId: string) {
  const items = (await publicClient.fetch(
    `*[_type == 'item' && category._ref == "${categoryId}"]`
  )) as TItem[]

  return items
}

export default function CafePage() {
  const { cart, cartTotal, addToCart } = useCart() as CartContextType

  const [menuItems, setMenuItems] = useState<TItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [currCategory, setCurrCategory] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  async function getMenuItems(categoryId: string) {
    setLoading(true)
    const nitems = await publicClient.fetch(
      `*[_type == 'item' && category._ref == "${categoryId}"]`
    )
    setLoading(false)
    setMenuItems(nitems)
  }

  useEffect(() => {
    async function fetchData() {
      const categories = await fetchCategories()
      const items = await fetchItems(categories[0]._id)

      setMenuItems(items)
      setCategories(categories)
      setCurrCategory(categories[0].title)
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto my-10">
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
                    setCurrCategory(category.title)
                    getMenuItems(category._id)
                  }}
                  className="pr-2"
                >
                  {category.title}
                </button>
              </div>
            )
          })}
        </aside>
        {/* Menu Items */}
        <section className="w-3/5 p-6">
          <h2 className="text-4xl mb-10">{currCategory}</h2>
          {loading ? (
            <h1>Items Loading</h1>
          ) : (
            <>
              {menuItems.map((item: any, idx: number) => {
                return (
                  <div key={idx}>
                    <div className="flex pb-4 mb-4 border-b-2">
                      {/* Food Image */}
                      <div className="w-auto">
                        <Image
                          src={urlFor(item.image).url() || '#'}
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
                )
              })}
            </>
          )}
        </section>
        {/* Cart Section */}
        <div className="w-1/5 py-6 ml-2 h-screen sticky top-0">
          {cart.length === 0 ? (
            <h3 className="text-4xl mb-10">Your Cart is Empty</h3>
          ) : (
            <div>
              <h3 className="text-4xl mb-10">Cart</h3>
              <CartItems />
              <p className="text-xl">
                Total: <span className="text-lg">₹</span> {cartTotal}
              </p>
              <button className="w-full mt-6 px-4 py-3 bg-green text-white hover:shadow-lg text-center">
                <Link href="/checkout" className="w-full">
                  Checkout
                </Link>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
