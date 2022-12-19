import { ChangeEvent, MouseEvent, useState } from 'react'
import { CountryCodes } from '../../../helper/countryCodes'
import { SubmitHandler, useForm } from 'react-hook-form'
import Profile from './EditProfileImage'
import InputField from '../../inputs/CustomInput'
import Button from '../../Button'
import Title from '../Title'
import {
  EMAIL_INCORRECT_ERR_MSG,
  MAX_DIGIT_TEL_NO_ERR_MSG,
  TEL_INCORRECT_ERR_MSG,
} from '../../../lang/errorMessages'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchUserInfo, updateUser } from '../../../utils/config'
import { NewUser, User } from '../../../typings'
import useErrorMsgHandler from '../../../hooks/use-error-msg-handler'

type Props = {}

const EditProfile = (props: Props) => {
  let firstname = ''
  let lastname = ''

  const [countryCode, setCountryCode] = useState<string>(CountryCodes[0].code)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [profileImage, setProfileImage] = useState<File | undefined>()
  console.log('profileImage', profileImage)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { setDetails } = useErrorMsgHandler({ setError })

  const handleCountryCode = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value)
  }
  const { data } = useQuery(
    ['user'],
    async () => (await fetchUserInfo()) as User
  )

  if (data) {
    const names = data?.full_name.split(' ')

    if (names?.length == 1) {
      firstname = names[0]
    } else {
      if (names) {
        firstname = names[0]
        lastname = names[1]
      }
    }
  }
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewUser>()

  const { isLoading, mutate, status } = useMutation(updateUser, {
    onMutate: async (newUser: User) => {
      console.log('newPatient from uploading file', newUser)
    },
  })

  const onSubmit: SubmitHandler<NewUser> = (newData: NewUser) => {
    let newTel = newData.phone
    let new_firstname = newData.firstname
    let new_lastname = newData.lastname
    let email = newData.email
    let address = newData.address
    let hospital = newData.hospital
    let location = newData.location

    // check what is the  country code
    if (newTel == '' && data) {
      newTel = data?.phone
    } else {
      newTel = '+' + countryCode + newData.phone
    }
    if (!new_firstname) {
      new_firstname = firstname
    }
    if (!new_lastname) {
      new_lastname = lastname
    }
    if (!email && data) {
      email = data?.email
    }
    if (!location && data) {
      location = data?.location
    }
    if (!address && data) {
      address = data?.address
    }
    if (!hospital && data) {
      hospital = data?.hospital
    }

    const UpdatedUser: User = {
      userProfile: profileImage,
      full_name: `${new_firstname} ${new_lastname}`,
      email,
      address,
      phone: newTel,
      location,
      hospital,
    }
    mutate(UpdatedUser, {
      onSuccess: async (response, variable, context) => {
        const data = await response.json()
        if (response.status === 201 || response.status === 200) {
          console.log('data', data)
          setSuccess('Successfully updated your information')
          // currentClient.invalidateQueries('patient')
        } else {
          const detail = data.detail
          console.log('detail', detail)
          setDetails(detail)
        }
      },
      onError: async (err: any, variables, context) => {
        // currentClient.setQueryData('patient', context.previousPatients)
        setError(err)
        console.log('Error while posting...', err)
        console.log('data sent is', variables)
      },
      onSettled: async () => {
        // currentClient.invalidateQueries('patient')
      },
    })
  }

  // handle Cancel Update
  const handleCancelUpdate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // cancel mutation
  }

  return (
    <form
      className='w-full xl:w-3/4 flex flex-col space-y-8 '
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex justify-between'>
        <Title>Edit Profile</Title>

        <Profile
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
        <div className='hidden xl:block' />
      </div>
      {error && (
        <p className='text-base text-red-500 bg-red-500/10 py-2 px-2 rounded-lg font-medium'>
          {error}
        </p>
      )}
      {success && (
        <p className='text-base text-green-500 bg-green-500/10 py-2 px-2 rounded-lg font-medium'>
          {success}
        </p>
      )}
      <div className='grid gap-2 grid-cols-1 md:grid-cols-2 h-fit'>
        <InputField
          type='text'
          label='firstname'
          fieldName='firstname'
          spaceY='2'
          placeholder={firstname || 'John'}
          control={control}
          defaultValue={firstname}
          error={errors.firstname}
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
          placeholder={lastname || 'Doe'}
          control={control}
          defaultValue={lastname}
          error={errors.lastname}
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
        defaultValue={data?.email || ''}
        error={errors.email}
        placeholder={data?.email || 'example@gmail.com'}
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
          className={`appearance-none outline-none bg-transparent absolute top-1/2 transform left-6 cursor-pointer ${
            errors.phone ? '-translate-y-[40%]' : 'translate-y-[18%]'
          }`}
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
          fieldName='phone'
          spaceY='2'
          error={errors.phone}
          placeholder={data?.phone || '720000000'}
          control={control}
          defaultValue={data?.phone || ''}
          rules={{
            maxLength: {
              value: 9,
              message: MAX_DIGIT_TEL_NO_ERR_MSG,
            },
            minLength: {
              value: 9,
              message: MAX_DIGIT_TEL_NO_ERR_MSG,
            },
            pattern: {
              value: /^[0-9]/,
              message: TEL_INCORRECT_ERR_MSG,
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
          defaultValue={data?.address || ''}
          error={errors.address}
          placeholder={data?.address || 'Jenga Leo, WestPark Tower'}
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
          error={errors.location}
          spaceY='2'
          placeholder={data?.location || 'Nairobi'}
          defaultValue={data?.location || ''}
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
        error={errors.hospital}
        defaultValue={data?.hospital || ''}
        placeholder={data?.hospital || 'Nairobi Hospital'}
        control={control}
        rules={
          {
            // pattern:
          }
        }
      />
      <div className='grid gap-2 grid-cols-1 md:grid-cols-2 h-fit pb-3'>
        <Button type='submit'>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button type='button' outlined onClick={handleCancelUpdate}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default EditProfile
