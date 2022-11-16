import { Icon } from '@iconify/react'
import { ChangeEvent, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import Image from 'next/image'
import NeuralLabsTextLogo from '../NeuralLabsTextLogo'
import { SCREEN } from '../../helper/responsive'
import BurgerMenu from '../BurgerMenu'
import SettingOptionSection from './SettingOptionSection'
import MainSectionNavBar from '../MainSectionNavBar'
import Profile from './EditProfileImage'
import { SubmitHandler, useForm } from 'react-hook-form'
import ContactUs from './contact-us'
import InputField from '../inputs/CustomInput'
import Button from '../Button'
import { FieldValues } from 'react-hook-form/dist/types'
import { CountryCodes } from '../../helper/countryCodes'

//

type Props = {}

const MainContentSection = (props: Props) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const [countryCode, setCountryCode] = useState<string>(CountryCodes[0].code)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  // query
  const isLargeDevice = useMediaQuery(`( min-width: ${SCREEN.lg} )`)
  const isMediumDevice = useMediaQuery(`( min-width: ${SCREEN.md} )`)

  const handleCountryCode = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value)
  }
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>()
  // {
  //   mode:"onChange"
  // }

  console.log('errors', errors)
  const onSubmit: SubmitHandler<FieldValues> = (data) =>
    console.log('data', data)
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
      <div className=' w-full h-full bg-gray-50/5 backdrop-blur lg:rounded-2xl overflow-y-hidden'>
        <section className='px-6 py-4 w-full h-full   lg:flex overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-light scrollbar-track-primary-light/20 scrollbar-thumb-rounded-[4px]  scroll-smooth '>
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
                fieldName='firstname'
                spaceY='2'
                placeholder='John'
                control={control}
                rules={{
                  // pattern:
                  max: {
                    value: 50,
                    message: 'maximum word length 50',
                  },
                }}
              />
              <InputField
                type='text'
                label='lastname'
                fieldName='lastname'
                spaceY='2'
                placeholder='Doe'
                control={control}
                rules={{
                  // pattern:
                  max: {
                    value: 50,
                    message: 'maximum word length 50',
                  },
                }}
              />
            </div>
            <InputField
              type='email'
              label='email'
              fieldName='email'
              spaceY='2'
              control={control}
              placeholder='example@gmail.com'
              rules={{
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'wrong email format',
                },
                max: {
                  value: 100,
                  message: 'maximum word length 50',
                },
              }}
            />
            <div className='relative h-fit w-full'>
              <select
                id='countrycode'
                value={countryCode}
                className='appearance-none outline-none bg-transparent absolute top-1/2 transform translate-y-[18%] left-6 cursor-pointer'
                onChange={handleCountryCode}
                onMouseDown={() => setIsClicked(true)}
                onMouseLeave={() => setIsClicked(false)}
              >
                {CountryCodes.map((item, key) => (
                  <option
                    value={item.code}
                    key={key}
                    className='flex space-x-1 text-sm md:text-base text-zinc-700 '
                  >
                    {item.country}
                    {'(+'}
                    {item.code}
                    {')'}
                  </option>
                ))}
              </select>
              <InputField
                type='tel'
                max={9}
                label='telephone'
                fieldName='telephone'
                spaceY='2'
                placeholder='0720000000'
                control={control}
                rules={{
                  pattern: {
                    value: /^[0-9]{10}/,
                    message: 'wrong telephone number',
                  },
                  max: {
                    value: 9,
                    message: 'max length 9',
                  },
                }}
                className='pl-36'
              />
            </div>
            <div className='grid gap-2 grid-cols-1 md:grid-cols-2 h-fit'>
              <InputField
                type='text'
                label='address'
                fieldName='address'
                spaceY='2'
                placeholder='Jenga Leo, WestPark Tower'
                control={control}
                rules={
                  {
                    // pattern:
                  }
                }
              />
              <InputField
                type='text'
                label='location'
                fieldName='location'
                spaceY='2'
                placeholder='Nairobi'
                control={control}
                rules={
                  {
                    // pattern:
                  }
                }
              />
            </div>
            <InputField
              type='text'
              label='Hospital / Medical Institution'
              spaceY='2'
              fieldName='hospital'
              placeholder='Nairobi Hospital'
              control={control}
              rules={
                {
                  // pattern:
                }
              }
            />
            <div className='grid gap-2 grid-cols-1 md:grid-cols-2 h-fit pb-3'>
              <Button type='submit'>Save Changes</Button>
              <Button type='button' outlined>
                Cancel
              </Button>
            </div>
          </form>
          <div className='lg:pl-4 pt-8 w-full lg:w-1/5'>
            <ContactUs />
          </div>
        </section>
      </div>
    </div>
  )
}

export default MainContentSection
