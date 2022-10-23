import React from 'react'
import { Icon } from '@iconify/react'

type Props = {}

const Logout = (props: Props) => {
  return (
    <button
      className={` cursor-pointer px-6 rounded-xl hover:bg-primary-light/20 fill-currenthover:text-primary-light/80 flex-col flex justify-center items-center space-y-2 py-[1rem] text-gray-50`}
    >
      <Icon icon={'uiw:logout'} className={` w-8 h-8`} />

      <p className='text-sm lowercase'>logout</p>
    </button>
  )
}

export default Logout
