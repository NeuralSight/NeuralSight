import React from 'react'
import { Icon } from '@iconify/react'
import { duration, IconButton } from '@mui/material'
import Head from 'next/head'
import Logo from '../../component/auth/Logo'
import InputField from '../../component/Input'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

// illustration
import AccessBotIllustration from '../../public/loginillustration.svg'

type Props = {}

type State = {
  email: string
  password: string
  showPassword: boolean
}

function Auth({}: Props) {
  const [values, setValues] = React.useState<State>({
    email: '',
    password: '',
    showPassword: false,
  })
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      // handle any change of all the inputs inside the object
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <div className='max-h-screen h-screen flex bg-gray-50'>
      <Head>
        <title>Login to NeuralSight</title>
      </Head>
      <motion.section
        initial={{
          opacity: 0,
        }}
        transition={{ duration: 0.5 }}
        animate={{
          opacity: 1,
        }}
        className='w-[45%] h-full items-center flex flex-col justify-evenly container mx-auto px-6 lg:px-12 xl:px-24 overflow-hidden'
      >
        <div className='flex flex-col space-y-2 text-center justify-center w-full items-center'>
          {/* Inputs */}
          {/* Logo section */}
          <div className='rounded-full w-16 h-16 border border-slate-500/50 p-2 flex items-center justify-center'>
            <Logo />
          </div>
          {/* Welcome Text */}
          <h3 className='text-4xl tracking-widest text-slate-900'>
            Hello Again!
          </h3>
          {/* Description Text */}
          <p className='font-medium text-sm lg:text-base lowercase text-slate-400'>
            Welcome back, please enter your details
          </p>
        </div>
        <form className='flex flex-col w-full h-auto space-y-6 '>
          <InputField
            id='email'
            label='email'
            type='email'
            value={values.email}
            handleChange={handleChange('email')}
            icon={
              <Icon icon='carbon:email' className='h-7 w-7 text-zinc-500/50' />
            }
          />
          <InputField
            id='password'
            label='password'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            handleChange={handleChange('password')}
            icon={
              <IconButton
                aria-label='toggle password visibility'
                edge='end'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? (
                  <Icon
                    icon='ic:baseline-visibility-off'
                    className='h-[30px]  w-[30px]  text-zinc-500/50'
                  />
                ) : (
                  <Icon
                    icon='ic:baseline-visibility'
                    className='h-[30px] w-[30px] text-zinc-500/50'
                  />
                )}
              </IconButton>
            }
          />
          <div className='w-full flex justify-between px-4 items-center'>
            <input type='checkbox' />
            <Link href={'/reset'}>
              <p className='cursor-pointer font-medium text-sm lg:text-base lowercase text-primary-light hover:text-primary-dark transition-all duration-200 '>
                forgot password?
              </p>
            </Link>
          </div>
        </form>
        <div className='flex flex-col w-full h-auto space-y-6 '>
          <button className=' w-full max-h-[24px] flex cursor-pointer rounded-xl border border-primary-light hover:border-primary-dark bg-primary-light hover:bg-primary-dark py-6 px-24 items-center justify-center transition-all duration-200 ease-in-out shadow-md shadow-primary-light/25 hover:shadow-primary-dark/25 hover:shadow'>
            <span className='text-white font-bold text-sm lg:text-base capitalize'>
              login
            </span>
          </button>
          <button
            type='button'
            className='flex  cursor-pointer w-auto max-h-6 py-6 px-20 rounded-xl bg-transparent border-[2px] border-zinc-500/50 text-sm lg:text-base font-medium text-zinc-500 justify-center items-center hover:bg-slate-400/10 transition-all duration-200 ease-in-out group '
          >
            <Icon
              icon='flat-color-icons:google'
              className='pr-2 h-7 w-7 group-hover:transform group-hover:animate-bounce ease-in-out duration-200'
            />{' '}
            Sign with Google
          </button>
        </div>
        <p className='text-sm lg:text-base text-slate-400 font-medium'>
          Want to give it a try?{' '}
          <Link href='#'>
            <span className='cursor-pointer capitalize text-primary-light hover:text-primary-dark transition-all duration-200'>
              Request a Demo
            </span>
          </Link>
        </p>
      </motion.section>
      <section className='w-[55%] h-full relative bg-accent/50 flex justify-center items-center overflow-hidden'>
        <motion.div
          initial={{
            x: 400,
            opacity: 0.5,
          }}
          transition={{
            duration: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          className='h-96 w-96 hover:bg-primary-light bg-primary-dark/100 rounded-full '
        />

        <div className='absolute top-0 left-0 z-10 w-full h-full'>
          <div className='h-1/3 w-full bg-white/20  backdrop-blur-lg block lg:hidden'>
            {/* glass Botton */}
            {/* text can be added here */}
          </div>
          <motion.div
            initial={{
              opacity: 0,
            }}
            transition={{ duration: 1.8 }}
            animate={{
              opacity: 1,
            }}
            className='h-1/3 lg:h-[40%] 2xl:h-[49.5%] w-full relative bottom-0 bg-white/20  backdrop-blur-lg lg:bg-transparent lg:backdrop-blur-0'
          >
            <Image
              src={AccessBotIllustration}
              layout='fill'
              object-fit='contain'
              alt='access power of ai in health an illustation of a girl communicating to a bot'
            />
          </motion.div>
          <motion.div
            initial={{
              y: 500,
            }}
            transition={{
              duration: 1.8,
            }}
            animate={{
              y: 0,
            }}
            className='h-1/3 lg:h-[60%] 2xl:h-[50.5%] w-full bg-white/20  backdrop-blur-lg '
          >
            {/* glass Botton */}
            {/* text can be added here */}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Auth
