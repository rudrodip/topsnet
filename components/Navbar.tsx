'use client'

import React from 'react';
import Link from "next/link"
import { useAuthContext } from '@context/AuthContext';
import { signOut } from 'firebase/auth'
import { auth } from '@src/firebase/config';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavButtonProps {
  link: string;
  url: string;
}

const Navbar: React.FC = () => {
  const { user } = useAuthContext()
  const logout = () => {
    return signOut(auth)
  }

  return (
    <nav className="sticky top-0 bg-gray-800 bg-opacity-30 backdrop-blur-lg z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex-shrink-0">
              <span className="text-white font-bold text-xl">TOPSnet</span>
            </div>
          </Link>
          <div className=" md:block">
            <ul className="flex space-x-4 items-center">
              <NavButton link="Home" url="/" />
              <NavButton link="About" url="/about" />
              <NavButton link="Contact" url="/contact" />
              {user ?
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage src={user?.photoURL || "https://github.com/shadcn.png"} alt="" />
                        <AvatarFallback>{user.displayName}</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href='/profile'>
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                :
                <li>
                  <a href="/signin" className="p-3 rounded-md text-sm bg-white text-black">
                    Get Started
                  </a>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const NavButton: React.FC<NavButtonProps> = ({ link, url }) => {
  return (
    <li>
      <Link href={url} className="text-gray-300 hover:bg-gray-700 hover:bg-opacity-40 px-3 py-2 rounded-md transition-all delay-100 ease-in-out hidden md:block">
        {link}
      </Link>
    </li>
  );
};