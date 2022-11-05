import { useState, MouseEvent } from 'react'
import NeuralLabsTextLogo from './NeuralLabsTextLogo'
import Profile from './Profile'
import Menu from './small-device-menu-popover'

type Props = {}

const SmallDeviceNavBar = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  // poppover props
  const open = Boolean(anchorEl)
  const id = open ? 'menu' : undefined
  return (
    <nav className='h-fit w-full flex justify-between bg-slate-50 items-center px-2 py-2 border-b-2 border-primary-light'>
      <NeuralLabsTextLogo />
      <button onClick={handleClick}>
        <Profile />
      </button>
      <Menu
        id={id}
        open={open}
        anchorEl={anchorEl}
        setAnchorElement={setAnchorEl}
      />
    </nav>
  )
}

export default SmallDeviceNavBar
