import Image from 'next/image'
import Link from 'next/link'
import UnderConstructionIllustration from '../public/undraw_under_construction.svg'
import Logo from './auth/Logo'
import Button from './Button'
import SocialsJSON from '../helper/data/socials.json'
import Input from './inputs/MUIInput'
import { SocialIcon } from 'react-social-icons'

type Props = {}

export default function CommingSoon({}: Props) {
  return (
    <div className='h-screen w-full gap-10 flex flex-col justify-center items-center relative'>
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

      <div className='max-w-lg'>
        <Image src={UnderConstructionIllustration} alt='under construction' />
      </div>
      <h4
        className='text-2xl md:text-5xl lg:text-7xl font-thin tracking-[5px] text-white uppercase'
        style={{ fontFamily: 'Oswald' }}
      >
        under construction
      </h4>
      <div className='max-w-lg w-full'>
        <p className='w-full text-center text-white font-normal text-sm tracking-wide'>
          Subscribe, to get early access
        </p>
        <form className='flex flex-col w-full'>
          <Input id='email' type='email' label='email' isColorWhite />
          <button
            type='submit'
            className='w-full items-center justify-center cursor-pointer rounded-lg fill-current border-2 border-primary-light hover:border-secondary-dark shadow-md shadow-primary-light/25 hover:shadow-primary-dark/25 bg-primary-light text-secondary-dark py-3 lg:text-base capitalize hover:bg-secondary-dark hover:text-white font-bold hover:shadow transition-all duration-200 ease-in-out'
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}
