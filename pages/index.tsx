import type { NextPage } from 'next'
import Head from 'next/head'
import SideBar from '../components/SideBar'
import PatientIDSection from '../components/dashboard/PatientIdSection'
import MainContentSection from '../components/dashboard/MainContentSection'

const Dashboard: NextPage = () => {
  return (
    <div className='max-h-screen  h-screen w-full bg-primary-dark'>
      <Head>
        <title>Neural Sight</title>
        <meta name='description' content='Neural Sight an Ai medical system' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='h-full w-full flex justify-between'>
        <SideBar />
        <main className='w-full flex py-10 px-10 gap-10'>
          <section className='w-1/3 '>
            <PatientIDSection />
          </section>
          <section className='w-2/3'>
            <MainContentSection />
          </section>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
