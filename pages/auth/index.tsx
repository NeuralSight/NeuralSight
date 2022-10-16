import React from 'react'
import { Icon } from '@iconify/react'
import { duration, IconButton } from '@mui/material'
import Head from 'next/head'
import Logo from '../../components/auth/Logo'
import InputField from '../../components/Input'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

// illustration
import RobotImage from '../../public/robot.svg'
import AccessBotIllustration from '../../public/loginillustration.svg'
import Button from '../../components/Button'
import ThirdPartyBtn from '../../components/auth/ThirdPartyBtn'

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
    <div className='max-h-screen h-screen flex bg-gray-50 relative'>
      <Head>
        <meta></meta>
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
        className='w-100 lg:w-[45%] h-full items-center flex flex-col justify-evenly container mx-auto md:px-12 px-12 xl:px-24 overflow-hidden'
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
          <p className=' text-sm lg:text-base lowercase text-slate-400'>
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
            <div className='flex text-zinc-500 font-medium gap-x-2 text-sm lg:text-base justify-center items'>
              <input
                type='checkbox'
                className='appearance-none checked:bg-primary-light/30'
              />{' '}
              Remember me
            </div>
            <Link href={'/reset'}>
              <p className='cursor-pointer font-medium text-sm lg:text-base lowercase text-primary-light hover:text-primary-dark transition-all duration-200 '>
                forgot password?
              </p>
            </Link>
          </div>
        </form>
        <div className='flex flex-col w-full h-auto space-y-6 '>
          <Button type='button' outlined={false}>
            login
          </Button>
          <ThirdPartyBtn type='button'>
            <Icon
              icon='flat-color-icons:google'
              className='pr-2 h-7 w-7 group-hover:transform group-hover:animate-bounce ease-in-out duration-200'
            />{' '}
            Sign with Google
          </ThirdPartyBtn>
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
      <section className='hidden lg:flex w-[55%] h-full relative bg-accent-one/50 justify-center items-center overflow-hidden'>
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
          className='h-96 w-96 bg-primary-dark/90 rounded-full '
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
            className='h-1/3 lg:h-[40%] 2xl:h-[49.3%] w-full relative bottom-0 bg-white/20  backdrop-blur-lg lg:bg-transparent lg:backdrop-blur-0'
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
            className='h-1/3 lg:h-[60%] 2xl:h-[50.7%] w-full bg-white/20  backdrop-blur-lg '
          >
            {/* glass Botton */}
            {/* text can be added here */}
          </motion.div>
        </div>
      </section>

      {/* Small device robot and sun */}
      <div className='block lg:hidden absolute h-96 w-60 -top-10 -left-[7.8em] rotate-[25deg]'>
        <Image
          src={RobotImage}
          alt='a robot'
          layout='fill'
          objectFit='contain'
        />
      </div>
      <div className='block lg:hidden absolute rounded-full h-80 w-80 bg-primary-light -top-[13em] -right-[13em] blur-3xl' />
    </div>
  )
}

export default Auth
