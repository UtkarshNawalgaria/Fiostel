import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import NavItems from './data/navItems';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <div className="flex justify-between items-center md:max-w-5xl mx-auto">
        <div>
          <Link href="/">
            <a>
              <Image
                src="/media/Fiostel-Logo.png"
                width={128}
                height={68}
                alt="Site Logo"
              />
            </a>
          </Link>
        </div>
        <div
          className={
            'h-8 w-10 md:hidden cursor-pointer ' + (sidebar ? 'hidden' : '')
          }
          onClick={showSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex md:justify-between">
          {NavItems.map((item, index) => {
            return (
              <Link href={item.path} key={index}>
                <a
                  key={index}
                  className="p-3 mx-3 text-lg font-medium border-b-2 border-transparent hover:border-yellow-300"
                >
                  {item.title}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>

      <Sidebar sidebar={sidebar} showSidebar={showSidebar}>
        <div>
          {NavItems.map((item, index) => {
            return (
              <div
                key={index}
                onClick={showSidebar}
                className="p-2 m-1 text-center border-b-4 border-transparent hover:border-yellow-300"
              >
                <Link href={item.path}>
                  <a>{item.title}</a>
                </Link>
              </div>
            );
          })}
        </div>
      </Sidebar>
    </div>
  );
};

export default Navbar;
