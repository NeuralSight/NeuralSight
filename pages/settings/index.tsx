import { useState } from 'react'
import MainContentSection from '../../components/settings/MainContentSection'
import SettingOptionSection from '../../components/settings/SettingOptionSection'
import Layout from '../layout'

type Props = {}

function Settings({}: Props) {
  const [active, setActive] = useState<string>('1')
  return (
    <Layout>
      <main className='w-full h-[94%] flex pt-6 justify-evenly'>
        <section className='hidden lg:block w-full lg:w-auto xl:w-auto'>
          <SettingOptionSection active={active} setActive={setActive} />
        </section>
        <section className='w-full lg:w-[55%] xl:w-[70%]'>
          <MainContentSection active={active} setActive={setActive} />
        </section>
      </main>
    </Layout>
  )
}

export default Settings
