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
import InputField from '../inputs/CustomInput'
import Button from '../Button'

type Props = {}

const MainContentSection = (props: Props) => {
  const [isOpen, setModalOpen] = useState<boolean>(false)
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  // query
  const isLargeDevice = useMediaQuery(`( min-width: ${SCREEN.lg} )`)
  const isMediumDevice = useMediaQuery(`( min-width: ${SCREEN.md} )`)

  return (
    <div className='w-full h-full flex flex-col gap-8 mb-10'>
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
      <section className='w-full h-[90%] mb-8 py-3 bg-gray-50/10 backdrop-blur lg:rounded-2xl px-6 flex overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-light scrollbar-track-primary-light/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scroll-smooth'>
        <div className='w-full lg:w-3/4 flex flex-col space-y-8'>
          <div className='flex justify-between'>
            <h3
              className='capitalize text-white text-xl lg:text-2xl xl:text-3xl pt-4 tracking-wide '
              style={{ fontFamily: 'Oswald' }}
            >
              Edit Profile
            </h3>
            <Profile />
            <div />
          </div>
          <div className='grid gap-2 grid-cols-1 md:grid-cols-2 h-fit'>
            <InputField
              type='text'
              label='firstname'
              spaceY='2'
              placeholder='John'
            />
            <InputField
              type='text'
              label='lastname'
              spaceY='2'
              placeholder='Doe'
            />
          </div>
          <InputField
            type='email'
            label='email'
            spaceY='2'
            placeholder='example@gmail.com'
          />
          <InputField
            type='tel'
            label='telephone'
            spaceY='2'
            placeholder='0720000000'
          />
          <div className='grid gap-2 grid-cols-1 md:grid-cols-2 h-fit'>
            <InputField
              type='text'
              label='address'
              spaceY='2'
              placeholder='Jenga Leo, WestPark Tower'
            />
            <InputField
              type='text'
              label='location'
              spaceY='2'
              placeholder='Nairobi'
            />
          </div>
          <InputField
            type='text'
            label='Hospital / Medical Institution'
            spaceY='2'
            placeholder='Nairobi Hosital'
          />
          <div className='grid gap-2 grid-cols-1 md:grid-cols-2 h-fit'>
            <Button type='submit'>Save Changes</Button>
            <Button type='button' outlined>
              Cancel
            </Button>
          </div>
        </div>
        <div className='pl-4 w-full lg:w-1/5'>
          <ContactUs />
        </div>
      </section>
    </div>
  )
}

export default MainContentSection
