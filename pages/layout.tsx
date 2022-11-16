import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useMediaQuery } from '@mui/material'
import SideBar from '../components/SideBar'

import { SCREEN } from '../helper/responsive'
import SmallDeviceNavBar from '../components/SmallDeviceNavBar'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
const Layout = ({ children }: Props) => {
  const isLargeDevice = useMediaQuery(`( min-width: ${SCREEN.lg} )`)
  return (
    <div className='relative h-full lg:min-h-screen lg:h-screen w-full bg-primary-dark mx-auto'>
      <Head>
        <title>Neural Sight</title>
        <meta name='description' content='Neural Sight an Ai medical system' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {isLargeDevice || (
        <header className='w-full h-fit'>
          <SmallDeviceNavBar />
        </header>
      )}
      <div className='h-full w-full flex justify-between pb-10 lg:pb-0'>
        {isLargeDevice && <SideBar />}
        {children}
      </div>
      {/* copyright */}
      <footer className='absolute bottom-0 pb-3 flex w-full space-x-2 justify-center items-center'>
        <p className=' text-sm lg:text-base text-slate-300 '>
          &#169; Neurallabs Africa
        </p>
        <div className='rounded-full h-1 w-1 bg-white/80' />
        <Link href={'#'}>
          <p className='text-sm lg:text-base text-slate-300 cursor-pointer hover:text-slate-100 hover:underline hover:decoration-slate-100'>
            Contact us
          </p>
        </Link>
        <div className='rounded-full h-1 w-1 bg-white/80' />
        <Link href={'#'}>
          <p className='text-sm lg:text-base text-slate-300 cursor-pointer hover:text-slate-100 hover:underline hover:decoration-slate-100'>
            Terms & privacy
          </p>
        </Link>
      </footer>
    </div>
  )
}

export default Layout
