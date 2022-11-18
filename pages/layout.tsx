import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useMediaQuery } from '@mui/material'
import SideBar from '../components/SideBar'

import { SCREEN } from '../helper/responsive'
import SmallDeviceNavBar from '../components/SmallDeviceNavBar'
import { ReactNode } from 'react'

import { AuthContext } from '../context/auth-context'
import { AuthContextType } from '../typings'
import Loading from './loading'

type Props = {
  children: ReactNode
  currentPageRoute: string
}
const Layout = ({ children, currentPageRoute }: Props) => {
  const router = useRouter()
  const authContext = useContext<AuthContextType | null>(AuthContext)

  useEffect(() => {
    // checks if the user is authenticated
    authContext?.isUserAuthenticated()
      ? router.push(currentPageRoute)
      : router.push('/auth')
  }, [authContext, currentPageRoute, router])
  const isLargeDevice = useMediaQuery(`( min-width: ${SCREEN.lg} )`)

  // inca
  if (!authContext?.authState || authContext.isUserAuthenticated() == false) {
    return <Loading />
  }
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
