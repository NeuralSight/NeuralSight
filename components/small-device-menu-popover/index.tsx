import React from 'react'
import { Menu as MenuList } from '../../helper/menu'
import CustomPopover from '../Popover'
import MenuCard from './MenuCard'

type Props = {
  id: 'more-details' | undefined
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
      <div className=''>
        <p>Welcome</p>
        {MenuList.map((item, key) => (
          <MenuCard {...item} />
        ))}
      </div>
    </CustomPopover>
  )
}

export default Menu
