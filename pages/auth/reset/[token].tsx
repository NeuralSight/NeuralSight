import { useState, useEffect, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Logo from '../../../components/auth/Logo'
import InputField from '../../../components/inputs/MUIInput'
import { Icon } from '@iconify/react'
import { IconButton } from '@mui/material'
import Link from 'next/link'
import Button from '../../../components/Button'
import Image from 'next/image'
import RobotCharging from '../../../public/robotCharging.svg'
import ErrorMessage from '../../../components/ErrorMessage'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Footer from '../../../components/Footer'
import {
  FIELD_REQUIRED_ERR_MSG,
  PASSWORD_LENGTH_ERR_MSG,
  PASSWORD_MISMATCH_ERR_MSG,
  PASSWORD_REQUIRED_ERR_MSG,
} from '../../../lang/auth'

type State = {
  password: string
  confirmPassword: string
}
type Props = {}

function ChangePassword({}: Props) {
  // getting token
  const router = useRouter()
  const { token } = router.query

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required(PASSWORD_REQUIRED_ERR_MSG)
      .min(8, PASSWORD_LENGTH_ERR_MSG),
    confirmPassword: Yup.string()
      .required(FIELD_REQUIRED_ERR_MSG)
      .oneOf([Yup.ref('password')], PASSWORD_MISMATCH_ERR_MSG),
  })
  const formOptions = { resolver: yupResolver(formSchema) }

  // useForm
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<State>(formOptions)

  const confirmPasswordField = watch('confirmPassword')

  const [error, setError] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const onSubmit: SubmitHandler<State> = (data) => console.log('data', data)
  const handleMouseDownPassword = (
    // prevent submitting while toggling show password btn
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  // unsubscribe from watch
  useEffect(() => {
    //  unsubcribe from watch once finished
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return subscription.unsubscribe()
  })
  useEffect(() => {
    setTimeout(() => {
      setError('')
      clearErrors('password')
      clearErrors('confirmPassword')
    }, 5000)
  }, [clearErrors, setError])
  return (
    <div>
      {errors.password?.message || errors.confirmPassword?.message || error ? (
        <ErrorMessage>
          {errors.confirmPassword?.message || errors.password?.message || error}
        </ErrorMessage>
      ) : null}
      <Head>
        <title>Reset Password</title>
      </Head>
      <div className='max-h-screen h-screen flex bg-gray-50 relative'>
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
                Change Password
              </h3>
            </div>
          </div>
          <form
            className='flex flex-col w-full h-auto space-y-6'
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              id='password'
              type={showPassword ? 'text' : 'password'}
              label='password'
              register={register('password')}
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
            <InputField
              id='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              label='confirmPassword'
              register={register('confirmPassword')}
              icon={
                <IconButton
                  aria-label='toggle password visibility'
                  edge='end'
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showConfirmPassword ? (
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
            <Button
              type='submit'
              outlined={false}
              disable={confirmPasswordField !== '' ? false : true}
            >
              Change Password
            </Button>
          </form>
          <p className='text-sm lg:text-base text-slate-400 font-medium'>
            Go back to{' '}
            <Link href='/auth'>
              <span className='cursor-pointer capitalize text-primary-light hover:text-primary-dark transition-all duration-200'>
                login page
              </span>
            </Link>
          </p>
          <Footer />
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
    </div>
  )
}

export default ChangePassword
