import React from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'

type Props = {
  active: boolean
  text: string
  icon: string
  link: string
  currentLink: string
  setIsSelected: React.Dispatch<React.SetStateAction<string>>
}
const NavItem = ({
  active,
  text,
  icon,
  link,
  currentLink,
  setIsSelected,
}: Props) => {
  return (
    <Link href={link}>
      <div
        onClick={() => setIsSelected(currentLink)}
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
    </Link>
  )
}

export default NavItem
