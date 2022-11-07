import PatientIDSection from '../../components/dashboard/PatientIdSection'
import MainContentSection from '../../components/dashboard/MainContentSection'
import Layout from '../layout'

type Props = {}

function settings({}: Props) {
  return (
    <Layout>
      <main className='w-full h-full flex pt-6 pb-10 justify-evenly'>
        <section className='hidden lg:block w-full lg:w-auto xl:w-auto'>
          <PatientIDSection />
        </section>
        <section className='w-full lg:w-[55%] xl:w-[70%]'>settings</section>
      </main>
    </Layout>
  )
}

export default settings
