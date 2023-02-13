import { Dispatch, SetStateAction } from 'react'
import CustomPopover from '../../Popover'
import MoreDetailsBtn from './MoreDetailsBtn'

// more details props
type Props = {
  id: 'more-details' | undefined
  open: boolean
  anchorEl: null | HTMLElement
  setAnchorElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  setDeleteModal: Dispatch<SetStateAction<boolean>>
}

const MoreDetailsLinks = [
  {
    name: 'Edit on OHIF',
    link: '#',
  },
  {
    name: 'View Report',
    link: '/report',
  },
  {
    name: 'delete',
    // link: '#',
  },
]

export default function MoreDetails({
  id,
  open,
  anchorEl,
  setAnchorElement,
  setDeleteModal,
}: Props) {
  const handleDelete = () => {
    setDeleteModal(true)
  }
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
      {MoreDetailsLinks.map((item, key) => (
        <MoreDetailsBtn
          key={key}
          link={item.link}
          handleDelete={item.name == 'delete' ? handleDelete : undefined}
        >
          {item.name}
        </MoreDetailsBtn>
      ))}
    </CustomPopover>
  )
}
