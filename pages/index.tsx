import type { NextPage } from 'next'
import Head from 'next/head'
import { lazy } from 'react'
import SideBar from '../components/SideBar'

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
      </div>
    </div>
  )
}

export default Dashboard
