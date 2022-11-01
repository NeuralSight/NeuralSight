import { useState } from 'react'
import { useRouter } from 'next/router'
import NavItemComponent from './NavItem'
import Profile from './Profile'
import Logout from './Logout'

// nav items
const NavItems = [
  {
    key: 1,
    text: 'home',
    icon: 'ci:home-fill',
    link: '/',
  },
  {
    key: 2,
    text: 'report',
    icon: 'ant-design:pie-chart-filled',
    link: '/report',
  },
  {
    key: 3,
    text: 'setting',
    icon: 'ant-design:setting-filled',
    link: '/setting',
  },
  {
    key: 4,
    text: 'alert',
    icon: 'clarity:notification-solid',
    link: '/alert',
  },
]

type Props = {}

const SideBar = (props: Props) => {
  const router = useRouter()
  console.log(router.pathname)
  const [selection, setSeletion] = useState<number>(0)
  return (
    <div className='h-full w-58 px-0.5 bg-accent-three flex flex-col justify-between py-10 shadow-md '>
      <nav className='h-auto flex flex-col space-y-1.5 items-center'>
        <Profile />
        {NavItems.map((item) => (
          // <Link href={item.link} key={item.key}>
          <NavItemComponent
            active={item.key === selection}
            text={item.text}
            icon={item.icon}
            handleClick={setSeletion}
            itemKey={item.key}
            key={item.key}
          />
          // </Link>
        ))}
      </nav>
      <Logout />
    </div>
  )
}

export default SideBar
