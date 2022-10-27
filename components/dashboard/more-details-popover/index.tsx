import React from 'react'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import MoreDetailsBtn from './MoreDetailsBtn'

// more details props
type Props = {
  id: 'more-details' | undefined
  open: boolean
  anchorEl: null | HTMLElement
  setAnchorElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

const MoreDetailsLinks = [
  {
    name: 'Edit on OHIF',
    link: '#',
  },
  {
    name: 'delete',
    link: '#',
  },
  {
    name: 'Re Detect',
    link: '#',
  },
]

export default function MoreDetails({
  id,
  open,
  anchorEl,
  setAnchorElement,
}: Props) {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      disablePortal
      onClose={() => setAnchorElement(null)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={{ border: '1px solid gray', p: 1 }}
      // className='rounded-md shadow px-2 py-3'
    >
      {MoreDetailsLinks.map((item, key) => (
        <MoreDetailsBtn key={key} link={item.link}>
          {item.name}
        </MoreDetailsBtn>
      ))}
    </Popover>
  )
}
