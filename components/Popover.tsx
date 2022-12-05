// more details props
import Popover from '@mui/material/Popover'
import { ReactNode } from 'react'
import { PopoverOrigin } from '@mui/material/Popover'
type Props = {
  children: ReactNode
  id: string | undefined
  open: boolean
  anchorEl: null | HTMLElement
  anchorOrigin: PopoverOrigin
  setAnchorElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

const CustomPopover = ({
  children,
  id,
  open,
  anchorEl,
  anchorOrigin,
  setAnchorElement,
}: Props) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorElement(null)}
      anchorOrigin={anchorOrigin}
      sx={{ border: '1px solid gray', p: 1 }}
    >
      {children}
    </Popover>
  )
}

export default CustomPopover
