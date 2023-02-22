import PatientIDSection from '../../components/dashboard/PatientIdSection'
import MainContentSection from '../../components/dashboard/MainContentSection'
import { GetServerSideProps } from 'next'
import Layout from '../layout'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { fetchPatients } from '../../utils/config'

function Dashboard() {
  return (
    <Layout>
      <main className='w-full h-[94%] flex pt-6 justify-evenly'>
        <section className='hidden lg:block h-full w-full lg:w-auto xl:w-auto'>
          <PatientIDSection />
        </section>
        <section className='h-full lg:h-[94%] w-full lg:w-[55%] xl:w-[70%]'>
          <MainContentSection />
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
