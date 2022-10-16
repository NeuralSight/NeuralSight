import Head from 'next/head'
import React from 'react'
import Logo from '../../components/auth/Logo'
import InputField from '../../components/Input'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import Button from '../../components/Button'
import Image from 'next/image'
import RobotCharging from '../../public/robotCharging.svg'

type Props = {}

function Reset({}: Props) {
  const [email, setEmail] = React.useState<string>('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  return (
    <div className='max-h-screen h-screen flex bg-gray-50 relative'>
      <Head>
        <title>Reset Password</title>
      </Head>
      <section
        className='w-100 lg:w-[60%] h-full items-center flex flex-col justify-between
      pt-20
      pb-10
      container mx-auto md:px-12 px-12 xl:px-36 overflow-hidden'
      >
        <div className='flex flex-col space-y-10 text-center justify-center w-full items-center'>
          {/* Logo section */}
          <div className='rounded-full w-16 h-16 border border-slate-500/50 p-2 flex items-center justify-center'>
            <Logo />
          </div>
          <div className='flex flex-col space-x-3'>
            <h3 className='text-3xl tracking-wide text-slate-900'>
              Forgot password?
            </h3>
            {/* Description Text */}
            <p className='font-medium text-sm lg:text-base text-accent-two'>
              Enter the email address you used when you joined and we&#39;ll
              send you instructions to reset your password. For security
              reasons, we do NOT store your password. So rest assured that we
              will never send your password via email.
            </p>
          </div>
        </div>
        <form className='flex flex-col w-full h-auto space-y-6'>
          <InputField
            id='email'
            type='email'
            label='email'
            value={email}
            handleChange={handleChange}
            icon={
              <Icon icon='carbon:email' className='h-7 w-7 text-zinc-500/50' />
            }
          />
          <Button type='submit' outlined={false}>
            continue
          </Button>
        </form>
        <p className='text-sm lg:text-base text-slate-400 font-medium'>
          Want to give it a try?{' '}
          <Link href='#'>
            <span className='cursor-pointer capitalize text-primary-light hover:text-primary-dark transition-all duration-200'>
              Request a Demo
            </span>
          </Link>
        </p>
        <footer className=' flex w-full space-x-2 justify-center items-center'>
          <p className='resetFooter '>&#169;Neurallabs</p>
          <div className='rounded-full h-2 w-2 text-black'></div>
          <Link href={'#'}>
            <p className='resetFooter cursor-pointer hover:text-slate-900'>
              Contact us
            </p>
          </Link>
          <div className='dot' />
          <Link href={'#'}>
            <p className='resetFooter cursor-pointer hover:text-slate-900'>
              Terms & privacy
            </p>
          </Link>
        </footer>
      </section>
      <section className='hidden lg:flex w-[40%] h-full relative bg-accent-one/50 justify-center items-center overflow-hidden px-6'>
        <div className='relative w-full h-full'>
          <Image
            src={RobotCharging}
            alt='robot illustration'
            layout='fill'
            objectFit='contain'
          />
        </div>
      </section>
    </div>
  )
}

export default Reset
