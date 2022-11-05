import { Icon } from '@iconify/react'
import React from 'react'
import { Menu as MenuList } from '../../helper/menu'
import CustomPopover from '../Popover'
import MenuCard from './MenuCard'

type Props = {
  id: 'menu' | undefined
  open: boolean
  anchorEl: null | HTMLElement
  setAnchorElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}
const Menu = ({ id, open, anchorEl, setAnchorElement }: Props) => {
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
        <MenuCard
          link='./logout'
          icon='majesticons:logout-half-circle-line'
          text='logout'
          key={1000}
        />
      </div>
    </CustomPopover>
  )
}

export default Menu
