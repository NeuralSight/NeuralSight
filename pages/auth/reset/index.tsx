import Head from 'next/head'
import Logo from '../../../components/auth/Logo'
import InputField from '../../../components/inputs/MUIInput'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import Button from '../../../components/Button'
import Image from 'next/image'
import RobotCharging from '../../../public/robotCharging.svg'
import { useForm, SubmitHandler } from 'react-hook-form'
import Footer from '../../../components/Footer'
type Props = {}

type State = {
  email: string
}
function Reset({}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<State>()

  const onSubmit: SubmitHandler<State> = (data) => console.log('data', data)
  return (
    <div className='max-h-screen h-screen flex bg-gray-50 relative'>
      <Head>
        <title>Reset Password</title>
      </Head>
      <section
        className='w-full lg:w-[60%] h-full items-center flex flex-col justify-between
      pt-20
      pb-10
      container mx-auto md:px-12 px-6 xl:px-36 overflow-hidden'
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
        <form
          className='flex flex-col w-full h-auto space-y-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            id='email'
            type='email'
            label='email'
            register={register('email', {
              required: 'email is required',
              pattern: {
                value: /^\S+@\S+$/i, // format tha it checks is string@string
                message: 'email is not correct',
              },
            })}
            icon={
              <Icon icon='carbon:email' className='h-7 w-7 text-zinc-500/50' />
            }
          />
          <Button
            type='submit'
            outlined={false}
            disable={errors.email?.message ? true : false}
          >
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
  )
}

export default Reset
