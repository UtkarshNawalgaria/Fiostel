import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'


const client = sanityClient({
    projectId: process.env.PROJECT_ID,
    dataset: process.env.DATASET,
    useCdn: false
})

export const publicClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATASET,
  useCdn: false,
});

export default client

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)



