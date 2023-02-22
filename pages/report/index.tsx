import { useContext, useEffect } from 'react'
import Layout from '../layout'
import PatientIDSection from '../../components/dashboard/PatientIdSection'
import MainContentSection from '../../components/report/MainContentSection'

type Props = {}

function Report({}: Props) {
  return (
    <Layout>
      <main className='w-full h-[94%] flex pt-6 justify-evenly'>
        <section className='hidden print:hidden lg:block w-full lg:w-auto xl:w-auto'>
          <PatientIDSection />
        </section>
        <section className='w-full lg:w-[55%] xl:w-[70%]'>
          <MainContentSection />
        </section>
      </main>
    </Layout>
  )
}

export default Report
