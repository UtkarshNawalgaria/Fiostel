import Link from 'next/link'
import social from './data/social'
import Socials from './Socials'

const Footer = () => {
  return (
    <div className="w-full bg-gray-800 text-gray-200 p-3">
      <div className="sm:container sm:mx-auto">
        {/* Top Row */}
        <div className="sm:flex sm:justify-center">
          {/* Left-hand Side */}
          <div className="flex flex-col sm:w-1/3 sm:p-2 text-center">
            <h3 className="text-xl font-semibold mb-6">Links</h3>
            <Link href="/cafe">
              <a className="mb-2">Cafe</a>
            </Link>
            <Link href="/about">
              <a className="mb-2">About Us</a>
            </Link>
            <Link href="#">
              <a className="mb-2">Code of Conduct</a>
            </Link>
          </div>

          {/* Middle Position */}

          <div className="sm:w-1/3 sm:p-2 text-center">
            <h3 className="text-xl font-semibold mb-6">REACH US AT</h3>
            {/* Social Links */}
            <div className="my-8 flex items-center justify-center mx-auto">
              {social.map((link) => {
                return (
                  <Link href={link.url} key={link.id}>
                    <a className="mx-2"><Socials icon={link.icon} style={link.style}/></a>
                  </Link>
                )
              })}
            </div>
            <div className="mt-6">
              <p>
                6/2, W.E.A KAROL BAGH,
                <br /> NEAR RBL BANK, GURUDWARA ROAD
                <br /> NEW DELHI- 110005
              </p>
            </div>
          </div>

          {/* Right Position */}
          <div className="sm:w-1/3 sm:p-2 text-center">
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <p>Ph: 9312144277</p>
          </div>
        </div>

        {/* Bottom Row */}

        <div className="text-center mt-6">
          <p>Fiostel Hospitality Private Limited &#619;</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
