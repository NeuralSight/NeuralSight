import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Logo from '../../../components/auth/Logo'
import InputField from '../../../components/Input'
import { Icon } from '@iconify/react'
import { IconButton } from '@mui/material'
import Link from 'next/link'
import Button from '../../../components/Button'
import Image from 'next/image'
import RobotCharging from '../../../public/robotCharging.svg'
import ErrorMessage from '../../../components/ErrorMessage'

type State = {
  password: string
  confirmPassword: string
  showPassword: boolean
  showConfirmPassword: boolean
}
type Props = {}

function ChangePassword({}: Props) {
  // getting token
  const router = useRouter()
  const { token } = router.query

  const [error, setError] = React.useState<string>('')
  const [values, setValues] = React.useState<State>({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  })

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleSubmit = () => {
    if (values.confirmPassword == values.password) {
      setError('password do not match')
    }
  }
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    // prevent submitting while toggling show password btn
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  setTimeout(() => {
    setError('')
  }, 3000)

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
              Change Password
            </h3>
          </div>
        </div>
        <form
          className='flex flex-col w-full h-auto space-y-6'
          onSubmit={() => handleSubmit}
        >
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <InputField
            id='password'
            type={values.showPassword ? 'text' : 'password'}
            label='password'
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
          <InputField
            id='confirmPassword'
            type={values.showPassword ? 'text' : 'password'}
            label='confirmPassword'
            value={values.confirmPassword}
            handleChange={handleChange('confirmPassword')}
            icon={
              <IconButton
                aria-label='toggle password visibility'
                edge='end'
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showConfirmPassword ? (
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
            disable={
              values.password == '' || values.confirmPassword == ''
                ? true
                : false
            }
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

export default ChangePassword
