import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import PatientIDSection from '../components/dashboard/PatientIdSection'
import MainContentSection from '../components/dashboard/MainContentSection'
import { AuthContext } from '../context/auth-context'
import { AuthContextType, PatientResult } from '../typings'
import Loading from './loading'
import { GetServerSideProps } from 'next'
import Layout from './layout'
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query'
import { fetchPatients } from '../utils/config'

function Dashboard() {
  const router = useRouter()
  const [active, setActive] = useState<string>('')

  const authContext = useContext<AuthContextType | null>(AuthContext)
  useEffect(() => {
    authContext?.getAuthState()

    // checks if the user is authenticated

    !authContext?.isUserAuthenticated() && authContext?.authState !== undefined
      ? router.push('/auth')
      : null
  }, [authContext, router])

  if (
    authContext?.isUserAuthenticated() == false &&
    authContext?.authState == undefined
  ) {
    return <Loading />
  }
  return (
    <Layout>
      <main className='w-full h-[94%] flex pt-6 justify-evenly'>
        <section className='hidden lg:block h-full w-full lg:w-auto xl:w-auto'>
          <PatientIDSection active={active} setActive={setActive} />
        </section>
        <section className='h-full lg:h-[94%] w-full lg:w-[55%] xl:w-[70%]'>
          <MainContentSection active={active} setActive={setActive} />
        </section>
      </main>
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['patients'], () => fetchPatients())
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Dashboard
