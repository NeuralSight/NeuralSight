import { Icon } from '@iconify/react'
import useLogout from '../hooks/use-logout'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {}

const Logout = (props: Props) => {
  const route = useRouter()
  const { isLoggingOut, error, logout, isSuccess } = useLogout('/api/logout')

  const handleLogout = async () => {
    await logout()
    route.push('/auth')
  }

  return (
    <button
      type='button'
      className={`cursor-pointer px-6 rounded-xl hover:bg-primary-light/20 fill-current flex-col flex justify-center items-center space-y-2 py-[1rem] text-gray-50`}
      onClick={handleLogout}
      title='logout'
    >
      <Icon
        icon={'uiw:logout'}
        className={`lg:w-8 lg:h-8 fill-current ${
          isLoggingOut && 'animate-bounceX'
        }`}
      />

      <p className='text-sm lowercase'>{'logout'}</p>
    </button>
  )
}

export default Logout
