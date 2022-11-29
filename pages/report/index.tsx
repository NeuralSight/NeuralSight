import React from 'react'
import Layout from '../layout'
import PatientIDSection from '../../components/dashboard/PatientIdSection'
import { useState } from 'react'
import MainContentSection from '../../components/report/MainContentSection'

type Props = {}

function Report({}: Props) {
  const [active, setActive] = useState<number>(0)
  return (
    <Layout>
      <main className='w-full h-[94%] flex pt-6 justify-evenly'>
        <section className='hidden lg:block w-full lg:w-auto xl:w-auto'>
          <PatientIDSection />
        </section>
        <section className='w-full lg:w-[55%] xl:w-[70%]'>
          <MainContentSection active={active} setActive={setActive} />
        </section>
      </main>
    </Layout>
  )
}

export default Report
