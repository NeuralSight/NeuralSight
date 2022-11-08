import { useState } from 'react'
import { useRouter } from 'next/router'
import NavItemComponent from './NavItem'
import Profile from './Profile'
import Logout from './Logout'
import { Menu } from '../helper/menu'

// nav items

type Props = {}

const SideBar = (props: Props) => {
  const router = useRouter()
  const [selection, setSeletion] = useState<string>(router.pathname)
  return (
    <div className='h-auto max-h-screen min-h-screen w-58 px-0.5 bg-accent-three flex flex-col justify-between py-10 shadow-md '>
      <nav className='h-auto flex flex-col space-y-1.5 items-center'>
        <Profile name='Doctor' />
        {Menu.map((item) => (
          <NavItemComponent
            active={item.link === selection}
            text={item.text}
            link={item.link}
            icon={item.icon}
            currentLink={router.pathname}
            setIsSelected={setSeletion}
            key={item.key}
          />
        ))}
      </nav>
      <Logout />
    </div>
  )
}

export default SideBar
