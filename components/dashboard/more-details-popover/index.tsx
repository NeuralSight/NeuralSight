import * as React from 'react'
import Box from '@mui/material/Box'
import Popper from '@mui/material/Popper'
// web.cjs is required for IE11 support
import { useSpring, animated } from '@react-spring/web'
import MoreDetailsBtn from './MoreDetailsBtn'

// more details props
type Props = {
  id: 'more details' | undefined
  open: boolean
  anchorEl: null | HTMLElement
}

// animate fade react spring
interface FadeProps {
  children?: React.ReactElement
  in?: boolean
  onEnter?: () => void
  onExited?: () => void
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const { in: open, children, onEnter, onExited, ...other } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    },
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  )
})

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

export default function MoreDetails({ id, open, anchorEl }: Props) {
  return (
    <div>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Box
              sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}
              className='flex flex-col px-2 py-3 rounded-md'
            >
              {MoreDetailsLinks.map((item, key) => (
                <MoreDetailsBtn key={key} link={item.link}>
                  {item.name}
                </MoreDetailsBtn>
              ))}
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  )
}
