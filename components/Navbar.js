"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession,signIn,signOut } from 'next-auth/react'

const Navbar = () => {
  const { data: session, status } = useSession()
  const [showdropdown,setshowdropdown]=useState(false);
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className='flex justify-between items-center px-4 h-16  bg-slate-900  '>
        <Link href={"/"} className='flex justify-center items-center gap-2 text-2xl font-bold font-sans'>
        <img className='invert' width={50} src="logo.png" alt="logo" />
        <span>Buy Me a Coffee</span>
        </Link>
   <div className='relative'>
   {session && <><button onClick={()=>{setshowdropdown(!showdropdown)}} onBlur={()=>{
        setTimeout(() => {
          setshowdropdown(false)
        }, 100);
      }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welocome {session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<div id="dropdown" className={`z-10 ${showdropdown?"":"hidden"} absolute left-[130px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
      </li>
      <li>
        <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
      </li>
  
      <li>
        <Link href="/login" onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
      </li>
    </ul>
</div>
</>
}
        {session && <Link href={"/login"}>
        <button onClick={handleLogout} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
        </Link>}
        {!session && <Link href={"/login"}>
        <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
        </Link>}
        </div>
    </nav>

  )
}

export default Navbar
