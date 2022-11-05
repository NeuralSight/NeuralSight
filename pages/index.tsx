import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import SideBar from '../components/SideBar'
import PatientIDSection from '../components/dashboard/PatientIdSection'
import MainContentSection from '../components/dashboard/MainContentSection'
import { useMediaQuery } from '@mui/material'
import { SCREEN } from '../helper/responsive'
import SmallDeviceNavBar from '../components/SmallDeviceNavBar'

const Dashboard: NextPage = () => {
  const isLargeDevice = useMediaQuery(`( min-width: ${SCREEN.lg} )`)
  return (
    <div className='relative h-full lg:min-h-screen lg:h-fit w-full bg-primary-dark mx-auto'>
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
      <div className='h-full w-full flex justify-between '>
        {isLargeDevice && <SideBar />}
        <main
          className='w-full h-full flex pt-6
        pb-10 justify-evenly'
        >
          <section className='hidden lg:block w-full lg:w-auto xl:w-auto'>
            <PatientIDSection />
          </section>
          <section className='w-full lg:w-[55%] xl:w-[70%]'>
            <MainContentSection />
          </section>
        </main>
      </div>
      {/* copyright */}
      <footer className='absolute bottom-[0.8%] xl:bottom-[2.5%] flex w-full space-x-2 justify-center items-center'>
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

export default Dashboard
