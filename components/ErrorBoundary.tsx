import Link from 'next/link'
import React from 'react'
import Logo from './auth/Logo'
import { SocialIcon } from 'react-social-icons'
import { ON_ERR_PRODUCTION_ERR_MSG } from '../lang/error-messages'
import Button from './Button'
import SocialsJSON from '../helper/data/socials.json'

type Props = {
  resetErrorBoundary: (...args: unknown[]) => void
  error: any
}

const ErrorMessagePage = ({ resetErrorBoundary, error }: Props) => {
  return (
    <div className='w-full h-full'>
      <div className='absolute left-[3%] top-[5%] cursor-pointer'>
        {/* logo to the left */}
        <Link href={'/dashboard'}>
          <Logo />
        </Link>
      </div>
      <div className='absolute right-[3%] top-[5%]'>
        {' '}
        {/* media handles to the right */}
        <ul className='ml-4 list-none flex items-center '>
          {' '}
          {SocialsJSON.map((social, key) => (
            <SocialIcon
              className='cursor-pointer'
              key={key}
              url={social}
              style={{
                height: '2.5rem',
                width: '2.5rem',
              }}
              bgColor='transparent'
              fgColor='rgb(241,245,249)'
            />
          ))}
        </ul>
      </div>
      <div className=' w-full h-full min-h-screen flex flex-col sm:px-20 px-12 py-20 xl:px-40 justify-center items-center space-y-12'>
        <div className='text-gray-50 text-xl capitalize leading-loose'>
          There was an error!
        </div>
        <div className='text-red-500 font-medium italic '>
          {process.env.NODE_ENV !== 'production'
            ? error.message
            : ON_ERR_PRODUCTION_ERR_MSG}
        </div>
        <Button onClick={() => resetErrorBoundary()}>Try again</Button>
      </div>
    </div>
  )
}

export default ErrorMessagePage
