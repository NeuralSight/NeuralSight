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
  console.log(router.pathname)
  const [selection, setSeletion] = useState<number>(1)
  return (
    <div className='h-auto max-h-screen min-h-screen w-58 px-0.5 bg-accent-three flex flex-col justify-between py-10 shadow-md '>
      <nav className='h-auto flex flex-col space-y-1.5 items-center'>
        <Profile name='Doctor' />
        {Menu.map((item) => (
          // <Link href={item.link} key={item.key}>
          <NavItemComponent
            active={item.key === selection}
            text={item.text}
            link={item.link}
            icon={item.icon}
            setIsSelected={setSeletion}
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
