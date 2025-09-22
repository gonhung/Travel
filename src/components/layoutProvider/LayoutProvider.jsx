"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { Navbar } from '../navbar/Navbar'
import { Footer } from '../footer/Footer'

export const LayoutProvider = ({
    children
}) => {
    const pathname = usePathname()
  return (
  <>
  {pathname !== "/login" && pathname !== "/signup" && <Navbar />}
  {children}
  {pathname !== "/login" && pathname !== "/signup" && <Footer />}
  </>
  )
  
}

export default LayoutProvider