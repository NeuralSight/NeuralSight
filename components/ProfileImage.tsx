import Image from 'next/image'
import { use, useContext } from 'react'
import { UserContext } from '../context/user-context'
import { UserContextType } from '../typings'
import DefaultProfile from '../public/user-solid.svg'

type Props = {
  name?: string
  photo?: string
}

function Profile({ name, photo }: Props) {
  let imageType = ''
  let fileName = ''
  const userContext = useContext<UserContextType | null>(UserContext)
  const userProfile = userContext?.getUserInfo()?.userProfile
  console.log('userProfile', userProfile)
  if (userProfile) {
    if (typeof userProfile == 'string') {
      const userProfileArr = userProfile.split('/')
      imageType = userProfileArr[1]
      fileName = userProfileArr[2]
    }
  }

  return (
    <div className='flex flex-col space-x-2'>
      <div>
        <Image
          className='relative h-12 w-12 lg:h-16 lg:w-16 rounded-full border-2 border-primary-light'
          src={
            imageType && fileName
              ? `${process.env.NEXT_PUBLIC_NEURALSIGHT_API_BASE_URL}/patient/file/${imageType}/${fileName}`
              : DefaultProfile
          }
          width={100}
          height={100}
          alt={"Doctor's name image"}
          priority
          loading='eager'
        />
      </div>
      {name && <p className='text-sm capitalize text-gray-50 pt-3'>{name}</p>}
    </div>
  )
}

export default Profile
