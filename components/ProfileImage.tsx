import Image from 'next/image'
import React from 'react'

type Props = {
  name?: string
  photo?: string
}

function Profile({ name, photo }: Props) {
  return (
    <div className='flex flex-col space-x-2'>
      <div>
        <Image
          className='relative h-12 w-12 lg:h-16 lg:w-16 rounded-full border-2 border-primary-light'
          src={
            photo ||
            'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80'
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
