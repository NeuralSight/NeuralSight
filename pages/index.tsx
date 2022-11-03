import type { NextPage } from 'next'
import Head from 'next/head'
import SideBar from '../components/SideBar'
import PatientIDSection from '../components/dashboard/PatientIdSection'
import MainContentSection from '../components/dashboard/MainContentSection'

const Dashboard: NextPage = () => {
  return (
    <div className='min-h-screen h-fit w-full bg-primary-dark'>
      <Head>
        <title>Neural Sight</title>
        <meta name='description' content='Neural Sight an Ai medical system' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='h-[inherit] w-full flex justify-between '>
        <SideBar />
        <main
          className='w-full h-full flex pt-6
        pb-12 px-8 gap-8 '
        >
          <section className='w-[30%] '>
            <PatientIDSection />
          </section>
          <section className='w-[70%]'>
            <MainContentSection />
          </section>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
