import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import NavItems from './data/navItems'
import Sidebar from './Sidebar'



const Navbar = () => {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <div>
            <div className="flex justify-between items-center md:max-w-5xl md:mx-auto">

                {/* Website Logo */}
                <div>
                    <Link href="/">
                        <a>
                            <Image src="/media/Fiostel-Logo.png" width={128} height={68} />
                        </a>
                    </Link>
                </div>

                {/* Menu Toggle Hamburger Icon */}
                <div className={"h-8 w-10 md:hidden " + (sidebar ? 'hidden' : '')} onClick={showSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </div>

                {/* Navigation Menu */}
                <nav className="hidden md:flex md:justify-between">
                    {NavItems.map((item, index) => {
                        return (
                            <Link href={item.path}>


                                <a key={index} className="p-3 mx-3 bg-gray-200 rounded">{item.title}</a>

                            </Link>
                        )
                    })}
                </nav>

            </div>

            <Sidebar sidebar={sidebar} showSidebar={showSidebar}>
                <div>
                    {NavItems.map((item, index) => {
                        return (
                            <div key={index} onClick={showSidebar} className="p-2 m-1 text-center bg-gray-200 rounded-lg hover:bg-gray-400">
                                <Link href={item.path}>
                                    <a>{item.title}</a>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </Sidebar>
        </div >
    )
}

export default Navbar
