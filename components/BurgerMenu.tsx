import { Icon } from '@iconify/react'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { bugerStyles } from '../styles/menu.style'
import { useMediaQuery } from '@mui/material'
import { SCREEN } from '../helper/responsive'
type Props = {
  children: ReactNode
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const BurgerMenu = ({ isOpen, setIsOpen, children }: Props) => {
  const isSmallest = useMediaQuery(`(max-width:${SCREEN.sm})`)
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <Menu
      styles={bugerStyles}
      isOpen={isOpen}
      width={isSmallest ? '100%' : '60%'}
      onClose={handleClose}
      customBurgerIcon={false}
      customCrossIcon={
        <button
          className='py-2 px-2 rounded cursor-pointer absolute right-4'
          onClick={handleClose}
        >
          <Icon
            icon={'bytesize:close'}
            className='h-6 w-6 fill-current text-zinc-500'
          />
        </button>
      }
    >
      {children}
    </Menu>
  )
}

export default BurgerMenu
