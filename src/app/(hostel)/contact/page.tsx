import { Metadata } from 'next'
import Heading from '../../../components/Heading'

export const metadata: Metadata = {
  title: 'Contact Us - Fiostel | Boys PG in Karol Bagh',
}

export default function ContactPage() {
  return (
    <>
      <Heading
        type="h1"
        title="Contact Us"
        styles="text-center text-4xl my-10 font-extrabold pb-4"
      />
    </>
  )
}
