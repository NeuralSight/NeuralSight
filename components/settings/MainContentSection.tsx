import { Icon } from '@iconify/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import NeuralLabsTextLogo from '../NeuralLabsTextLogo'
import { SCREEN } from '../../helper/responsive'
import BurgerMenu from '../BurgerMenu'
import SettingOptionSection from './SettingOptionSection'
import MainSectionNavBar from '../MainSectionNavBar'
import ContactUs from './contact-us'
import EditProfile from './edit-profile'
import EditPassword from './edit-security'

//

type Props = {
  active: number
  setActive: Dispatch<SetStateAction<number>>
}

const MainContentSection = ({ active, setActive }: Props) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const isLargeDevice = useMediaQuery(`( min-width: ${SCREEN.lg} )`)

  return (
    <div className='w-full h-full flex flex-col gap-6 '>
      <MainSectionNavBar>
        {isLargeDevice || (
          <Icon
            icon='ant-design:menu-outlined'
            className='h-7 w-7 text-gray-600 active:text-primary-light'
            onClick={() => setIsOpenMenu(true)}
          />
        )}
        <div className='italic text-gray-400 text-sm'>
          600d475fa96e305as2e48c9cfbb851qs
        </div>
        {isLargeDevice || (
          <BurgerMenu isOpen={isOpenMenu} setIsOpen={setIsOpenMenu}>
            {<SettingOptionSection active={active} setActive={setActive} />}
          </BurgerMenu>
        )}

        {isLargeDevice && <NeuralLabsTextLogo />}
      </MainSectionNavBar>
      <div className=' w-full h-full bg-gray-50/5 backdrop-blur lg:rounded-2xl overflow-y-hidden'>
        <section className='px-6 py-4 w-full h-full xl:flex overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-light scrollbar-track-primary-light/20 scrollbar-thumb-rounded-[4px] scroll-smooth '>
          {active == 0 ? <EditProfile /> : <EditPassword />}
          <div className='xl:pl-4 pt-8 w-full xl:w-1/5'>
            <ContactUs />
          </div>
        </section>
      </div>
    </div>
  )
}

export default MainContentSection
