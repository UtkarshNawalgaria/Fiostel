import { ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = ({ children }: { children: ReactNode}) => {
  return (
    <>
      <header className="p-3 border-b-2">
        <Navbar />
      </header>

      <main>{children}</main>

      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Layout
