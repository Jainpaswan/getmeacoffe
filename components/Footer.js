import React from 'react'

export default function Footer() {
  const CurrentYear=new Date().getFullYear();
  return (
    <footer className="flex bg-slate-900 text-white items-center  justify-center px-4 h-16">
        <p className="text-center">CopyRight &copy; {CurrentYear} -All Rights are Reserved </p>
    </footer>
  )
}
