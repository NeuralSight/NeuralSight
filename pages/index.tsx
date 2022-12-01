import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import dynamic from 'next/dynamic'
import PatientIDSection from '../components/dashboard/PatientIdSection'
import MainContentSection from '../components/dashboard/MainContentSection'
import { AuthContext } from '../context/auth-context'
import { AuthContextType } from '../typings'
import Loading from './loading'

// lazy import
const Layout = dynamic(() => import('./layout'))

type Props = {}

function Dashboard({}: Props) {
  const router = useRouter()
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
        <section className='hidden lg:block w-full lg:w-auto xl:w-auto'>
          <PatientIDSection />
        </section>
        <section className='w-full lg:w-[55%] xl:w-[70%]'>
          <MainContentSection />
        </section>
      </main>
    </Layout>
  )
}

export default Dashboard
