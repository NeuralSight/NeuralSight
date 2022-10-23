import Image from 'next/image'
import React from 'react'

type Props = {}

function Profile({}: Props) {
  return (
    <div className='flex flex-col space-x-2 pb-3'>
      <div className='relative h-16 w-16 rounded-full border-2 border-primary-light'>
        <Image
          src={
            'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80'
          }
          alt={"Doctor's name image"}
          layout={'fill'}
          objectFit='contain'
          className='rounded-full'
          priority
          loading='eager'
        />
      </div>
      <p className='text-sm capitalize text-gray-50'>Doctor</p>
    </div>
  )
}

export default Profile
