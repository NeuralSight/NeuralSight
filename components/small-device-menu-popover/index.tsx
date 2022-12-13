import { Icon } from '@iconify/react'
import React from 'react'
import { Menu as MenuList } from '../../helper/menu'
import useLogout from '../../hooks/use-logout'
import CustomPopover from '../Popover'
import MenuCard from './MenuCard'

type Props = {
  id: 'menu' | undefined
  open: boolean
  anchorEl: null | HTMLElement
  setAnchorElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}
const Menu = ({ id, open, anchorEl, setAnchorElement }: Props) => {
  const { isLoggingOut, error, logout } = useLogout('/api/logout')

  const handleLogout = async () => {
    await logout()
  }

  error && console.log('oops, their was an error', error)

  return (
    <CustomPopover
      id={id}
      open={open}
      anchorEl={anchorEl}
      setAnchorElement={setAnchorElement}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <div className='flex flex-col px-4 py-4 shadow-lg'>
        <p className='text-sm font-medium text-left w-full mb-3'>Welcome</p>
        {MenuList.map((item, key) => (
          <MenuCard {...item} key={item.key} />
        ))}
        <button onClick={handleLogout}>
          <MenuCard
            isClicked={isLoggingOut}
            icon='majesticons:logout-half-circle-line'
            text={'logout'}
            key={1000}
          />
        </button>
      </div>
    </CustomPopover>
  )
}

export default Menu
