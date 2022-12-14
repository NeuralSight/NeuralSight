import { ChangeEvent, useState } from 'react'
import { CountryCodes } from '../../../helper/countryCodes'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Profile from './EditProfileImage'
import InputField from '../../inputs/CustomInput'
import Button from '../../Button'
import Title from '../Title'
import { EMAIL_INCORRECT_ERR_MSG } from '../../../lang/errorMessages'

type Props = {}

const EditProfile = (props: Props) => {
  const [countryCode, setCountryCode] = useState<string>(CountryCodes[0].code)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const handleCountryCode = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value)
  }
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>()

  console.log('errors', errors)
  const onSubmit: SubmitHandler<FieldValues> = (data) =>
    console.log('data', data)
  return (
    <form
      className='w-full xl:w-3/4 flex flex-col space-y-8 '
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex justify-between'>
        <Title>Edit Profile</Title>
        <Profile />
        <div className='hidden xl:block' />
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
            message: EMAIL_INCORRECT_ERR_MSG,
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
  )
}

export default EditProfile
