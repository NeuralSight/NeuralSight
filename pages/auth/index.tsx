import { useState, useEffect, MouseEvent, useContext } from 'react'
import { Icon } from '@iconify/react'
import { IconButton } from '@mui/material'
import Head from 'next/head'
import Logo from '../../components/auth/Logo'
import InputField from '../../components/inputs/MUIInput'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import useLogin from '../../hooks/use-login'
import { AuthContext } from '../../context/auth-context'
import { useRouter } from 'next/router'
import Loading from '../loading'

// illustration
import RobotImage from '../../public/robot.svg'
import AccessBotIllustration from '../../public/loginillustration.svg'
import Button from '../../components/Button'
import ThirdPartyBtn from '../../components/auth/ThirdPartyBtn'
import Message from '../../components/Message'
import Footer from '../../components/Footer'
import {
  EMAIL_INCORRECT_ERR_MSG,
  EMAIL_REQUIRED_ERR_MSG,
  PASSWORD_LENGTH_ERR_MSG,
  PASSWORD_REQUIRED_ERR_MSG,
  SERVER_ERR_MSG,
} from '../../lang/errorMessages'
import { AuthContextType } from '../../typings'
import { ErrorDetails } from '../../typings'
import useErrorMsgHandler from '../../hooks/use-error-msg-handler'
type Props = {}

type State = {
  email: string
  password: string
}

function Auth({}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<State>()
  // create authContext
  const authContext = useContext<AuthContextType | null>(AuthContext)
  const route = useRouter()

  useEffect(() => {
    authContext?.getAuthState()
    // checks if the user is authenticated
    authContext?.authState == null && !authContext?.isUserAuthenticated()
      ? null
      : route.replace('/', undefined, { shallow: true })
  }, [authContext, route])

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { setDetails, detail } = useErrorMsgHandler({ setError })

  const { mutate, isLoading, status } = useLogin()

  const onSubmit: SubmitHandler<State> = (data) => {
    return mutate(
      {
        username: data.email,
        password: data.password,
      },
      {
        onSuccess: (data, variable, context) => {
          if (data.status === 200) {
            if (data?.data?.access_token) {
              // console.log('data', data)
              authContext?.setAuthState(data.data)
              // go to dashboard
              route.push('/')
              // clear all the error message
              setError(null)
              clearErrors('email')
              clearErrors('password')
            } else {
              setError('data is not in the right format')
            }
          } else {
            const detail = data.data.detail
            setDetails(detail)
          }
        },
        onError: (err) => {
          console.error('error', err)
          setError(SERVER_ERR_MSG)
        },
        onSettled: () => {
          console.log('settled')
        },
      }
    )
  }

  const watchField = watch(['email', 'password'])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  useEffect(() => {
    // unsubcribe from watch once finished
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return () => subscription.unsubscribe()
  }, [watch])

  if (authContext?.authState != null) {
    return <Loading />
  }

  return (
    <div className=' bg-gray-50'>
      {errors.email?.message || errors.password?.message || error ? (
        <Message>
          {errors.email?.message || errors.password?.message || error}
        </Message>
      ) : null}
      <Head>
        <meta></meta>
        <title>Login to NeuralSight</title>
      </Head>
      <div className='flex max-h-screen h-screen'>
        <motion.section
          initial={{
            opacity: 0,
          }}
          transition={{ duration: 0.5 }}
          animate={{
            opacity: 1,
          }}
          className='w-full lg:w-[45%] h-full items-center flex flex-col justify-evenly container mx-auto px-6 md:px-12  xl:px-24 overflow-hidden relative'
        >
          {/* Small device robot and sun */}
          <div className='block lg:hidden absolute h-96 w-60 -top-16 -left-[7.8em] rotate-[25deg] opacity-80'>
            <Image
              src={RobotImage}
              alt='a robot'
              layout='fill'
              objectFit='contain'
              priority
            />
          </div>
          <div className='block lg:hidden absolute rounded-full h-80 w-80 bg-primary-light -top-[13em] -right-[13em] blur-3xl' />
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
          <form
            className='flex flex-col w-full h-auto space-y-6 '
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              id='email'
              label='email'
              type='email'
              register={register('email', {
                required: EMAIL_REQUIRED_ERR_MSG,
                pattern: {
                  value: /^\S+@\S+$/i, // format tha it checks is string@string
                  message: EMAIL_INCORRECT_ERR_MSG,
                },
              })}
              icon={
                <Icon
                  icon='carbon:email'
                  className='h-7 w-7 text-zinc-500/50'
                />
              }
            />
            <InputField
              id='password'
              label='password'
              type={showPassword ? 'text' : 'password'}
              register={register('password', {
                required: PASSWORD_REQUIRED_ERR_MSG,
                min: {
                  value: 8,
                  message: PASSWORD_LENGTH_ERR_MSG,
                },
              })}
              icon={
                <IconButton
                  aria-label='toggle password visibility'
                  edge='end'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? (
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
                  onChange={(e) =>
                    authContext?.setIsRemembered(e.target.checked)
                  }
                  className='appearance-none checked:bg-primary-light/30'
                />{' '}
                Remember me
              </div>
              <Link href={'/auth/reset'}>
                <p className='cursor-pointer font-medium text-sm lg:text-base lowercase text-primary-light hover:text-primary-dark transition-all duration-200 '>
                  forgot password?
                </p>
              </Link>
            </div>
            <div className='flex flex-col w-full h-auto space-y-6 '>
              <Button
                type='submit'
                outlined={false}
                disable={watchField[0] && watchField[1] ? false : true}
              >
                {isLoading ? 'logging in...' : ' login'}
              </Button>
              <ThirdPartyBtn type='button'>
                {/* animate google icon to rotate once */}
                <Icon
                  icon='flat-color-icons:google'
                  className='pr-2 h-7 w-7 group-hover:transform ease-in-out duration-200'
                />{' '}
                Sign with Google
              </ThirdPartyBtn>
            </div>
          </form>

          <p className='text-sm lg:text-base text-slate-400 font-medium'>
            Want to give it a try?{' '}
            <Link href='#'>
              <span className='cursor-pointer capitalize text-primary-light hover:text-primary-dark transition-all duration-200'>
                Request a Demo
              </span>
            </Link>
          </p>
          <Footer />
        </motion.section>
        <section className='hidden lg:flex lg:w-[55%] h-full relative bg-accent-one/50 justify-center items-center overflow-hidden'>
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
              className='h-1/3 lg:h-[40%] 2xl:h-[48%] w-full relative bottom-0 bg-white/20  backdrop-blur-lg lg:bg-transparent lg:backdrop-blur-0'
            >
              <Image
                src={AccessBotIllustration}
                layout='fill'
                object-fit='contain'
                priority
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
              {/* text can be added here */}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Auth
