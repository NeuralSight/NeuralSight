import { MouseEvent } from 'react'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'

type Props = {}

const Logout = (props: Props) => {
  const route = useRouter()
  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // req to set cookie in the backend if the user says remember me
    const response = await fetch('/api/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log('data', data.success)
    if (data.success) {
      route.push('/auth')
    }
  }
  return (
    <button
      type='button'
      className={`cursor-pointer px-6 rounded-xl hover:bg-primary-light/20 fill-currenthover:text-primary-light/80 flex-col flex justify-center items-center space-y-2 py-[1rem] text-gray-50`}
      onClick={handleLogout}
      title='logout'
    >
      <Icon icon={'uiw:logout'} className={`lg:w-8 lg:h-8 fill-current`} />

      <p className='text-sm lowercase'>logout</p>
    </button>
  )
}

export default Logout
