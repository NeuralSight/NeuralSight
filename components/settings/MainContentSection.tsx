import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useMediaQuery } from '@mui/material'
import NeuralLabsTextLogo from '../NeuralLabsTextLogo'
import Modal from '../Modal'
import { SCREEN } from '../../helper/responsive'
import BurgerMenu from '../BurgerMenu'
import SettingOptionSection from './SettingOptionSection'
import MainSectionNavBar from '../MainSectionNavBar'
import Profile from './EditProfileImage'
import ContactUs from './contact-us'

type Props = {}

const MainContentSection = (props: Props) => {
  const [isOpen, setModalOpen] = useState<boolean>(false)
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  // query
  const isLargeDevice = useMediaQuery(`( min-width: ${SCREEN.lg} )`)
  const isMediumDevice = useMediaQuery(`( min-width: ${SCREEN.md} )`)

  return (
    <div className='w-full h-full flex flex-col gap-8'>
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
            {<SettingOptionSection />}
          </BurgerMenu>
        )}

        {isLargeDevice && <NeuralLabsTextLogo />}
      </MainSectionNavBar>
      <section className='h-full w-full py-3 bg-gray-50/25 backdrop-blur lg:rounded-2xl'>
        <div className='flex justify-between px-6 py-4'>
          <h3 className='capitalize text-white text-2xl xl:text-3xl'>
            Edit Profile
          </h3>
          <Profile />
          <ContactUs />
        </div>
      </section>
    </div>
  )
}

export default MainContentSection
