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
import { SubmitHandler, useForm } from 'react-hook-form'

type Props = {}

type State = {
  firstname: string
  lastname: string
  email: string
  tel: string
  address: string
  location: string
  hospital: string
}

const MainContentSection = (props: Props) => {
  const [isOpen, setModalOpen] = useState<boolean>(false)
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  // query
  const isLargeDevice = useMediaQuery(`( min-width: ${SCREEN.lg} )`)
  const isMediumDevice = useMediaQuery(`( min-width: ${SCREEN.md} )`)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<State>()

  console.log('errors', errors)
  const onSubmit: SubmitHandler<State> = (data) => console.log('data', data)
  return (
    <div className='w-full h-full flex flex-col gap-8 '>
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
      <div className=' w-full h-full py-3 bg-gray-50/10  lg:rounded-2xl overflow-y-hidden'>
        <section className='px-6 w-full h-full  backdrop-blur flex overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-light scrollbar-track-primary-light/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scroll-smooth '>
          <form
            className='w-full lg:w-3/4 flex flex-col space-y-8 '
            onSubmit={handleSubmit(onSubmit)}
          >
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
                register={register('firstname', {
                  // pattern:
                  max: {
                    value: 50,
                    message: 'maximum word length 50',
                  },
                })}
              />
              <InputField
                type='text'
                label='lastname'
                spaceY='2'
                placeholder='Doe'
                register={register('lastname', {
                  // pattern:
                  max: {
                    value: 50,
                    message: 'maximum word length 50',
                  },
                })}
              />
            </div>
            <InputField
              type='email'
              label='email'
              spaceY='2'
              placeholder='example@gmail.com'
              register={register('email', {
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'wrong email format',
                },
                max: {
                  value: 100,
                  message: 'maximum word length 50',
                },
              })}
            />
            <InputField
              type='tel'
              max={9}
              label='telephone'
              spaceY='2'
              placeholder='0720000000'
              register={register('tel', {
                pattern: {
                  value: /^[0-9]{10}/,
                  message: 'wrong telephone number',
                },
                max: {
                  value: 9,
                  message: 'max length 9',
                },
              })}
            />
            <div className='grid gap-2 grid-cols-1 md:grid-cols-2 h-fit'>
              <InputField
                type='text'
                label='address'
                spaceY='2'
                placeholder='Jenga Leo, WestPark Tower'
                register={register('address', {
                  // pattern:
                })}
              />
              <InputField
                type='text'
                label='location'
                spaceY='2'
                placeholder='Nairobi'
                register={register('location', {
                  // pattern:
                })}
              />
            </div>
            <InputField
              type='text'
              label='Hospital / Medical Institution'
              spaceY='2'
              placeholder='Nairobi Hospital'
              register={register('hospital', {
                // pattern:
              })}
            />
            <div className='grid gap-2 grid-cols-1 md:grid-cols-2 h-fit pb-3'>
              <Button type='submit'>Save Changes</Button>
              <Button type='button' outlined>
                Cancel
              </Button>
            </div>
          </form>
          <div className='pl-4 w-full lg:w-1/5'>
            <ContactUs />
          </div>
        </section>
      </div>
    </div>
  )
}

export default MainContentSection
