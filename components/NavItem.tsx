import React from 'react'
import { Icon } from '@iconify/react'
import { NavItem } from '../typings'

type Props = NavItem
const NavItem = ({ active, text, icon }: Props) => {
  return (
    <div
      className={` cursor-pointer ${
        active
          ? 'pb-6 pt-4 bg-primary-light/30 text-primary-light'
          : 'py-[1rem] text-gray-50 '
      }  px-6 rounded-xl hover:bg-primary-light/20 fill-currenthover:text-primary-light/80 flex-col flex justify-center items-center space-y-2`}
    >
      <Icon icon={icon} className={` w-8 h-8`} />
      {active ? (
        <div className='w-[80%] h-1 rounded-full bg-primary-light' />
      ) : (
        <p className='text-sm lowercase'>{text}</p>
      )}
    </div>
  )
}

export default NavItem
