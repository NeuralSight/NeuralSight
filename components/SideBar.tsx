import React, { useRef } from 'react'
import NavItemComponent from './NavItem'
import Link from 'next/link'
import Logout from './Logout'
import Profile from './Profile'
import { useRouter } from 'next/router'

// nav items
const NavItems = [
  {
    text: 'home',
    icon: 'ci:home-fill',
    link: '/',
  },
  {
    text: 'report',
    icon: 'ant-design:pie-chart-filled',
    link: '/#report',
  },
  {
    text: 'setting',
    icon: 'ant-design:setting-filled',
    link: '/setting',
  },
  {
    text: 'alert',
    icon: 'clarity:notification-solid',
    link: '/alert',
  },
]

type Props = {}

const SideBar = (props: Props) => {
  const router = useRouter()
  const onClick = (e: EventTarget) => {}
  return (
    <div className='h-full w-fit px-2 bg-accent-three flex flex-col justify-between py-10 shadow-md'>
      <nav className='h-auto flex flex-col space-y-1.5 items-center'>
        <Profile />
        {NavItems.map((item, key) => (
          <Link href={item.link} key={key}>
            <NavItemComponent
              active={router.pathname == item.link ? true : false}
              text={item.text}
              icon={item.icon}
              key={key}
            />
          </Link>
        ))}
      </nav>
      <Logout />
    </div>
  )
}

export default SideBar
