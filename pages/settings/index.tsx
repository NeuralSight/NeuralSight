import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/auth-context'
import { AuthContextType } from '../../typings'

import MainContentSection from '../../components/settings/MainContentSection'
import SettingOptionSection from '../../components/settings/SettingOptionSection'
import Layout from '../layout'
import Loading from '../loading'

type Props = {}

function Settings({}: Props) {
  const [active, setActive] = useState<string>('1')
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
