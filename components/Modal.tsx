import React from 'react'
import { motion } from 'framer-motion'
import { Modal as CustomModal } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Icon } from '@iconify/react'

interface FadeProps {
  children?: React.ReactElement
  in: boolean
  onEnter?: () => {}
  onExited?: () => {}
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const { in: open, children, onEnter, onExited, ...other } = props

  return (
    <motion.div
      ref={ref}
      {...other}
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      animate={{
        opacity: open ? 1 : 0,
      }}
    >
      {children}
    </motion.div>
  )
})

const defaultStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '8px',
  p: 4,
}
type Props = {
  children: React.ReactElement
  style?: object
  open: boolean
  title?: string | undefined
  description?: string | undefined
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({
  children,
  style = defaultStyle,
  title,
  description,
  open,
  setOpen,
}: Props) => {
  const handleClose = () => setOpen(false)

  return (
    <CustomModal
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={style}>
          <button
            onClick={handleClose}
            className='absolute top-[5%] right-[5%] rounded-md p-2 fill-current hover:bg-zinc-500/30 text-gray-700 '
          >
            <Icon icon='bytesize:close' className='h-5 w-5' />
          </button>

          {title && (
            <Typography
              id='modal-title'
              variant='h6'
              component='h2'
              className='text-slate-900 text-center'
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              id='modal-description'
              sx={{ mt: 2 }}
              className='text-slate-500 text-center'
            >
              {description}
            </Typography>
          )}
          {children}
        </Box>
      </Fade>
    </CustomModal>
  )
}

export default Modal
