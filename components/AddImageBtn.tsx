import { Icon } from '@iconify/react'
import React from 'react'

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddImageBtn = ({ setOpen }: Props) => {
  return (
    <button
      type='button'
      onClick={() => setOpen(true)}
      className='rounded-3xl w-full h-full border-2 border-dashed border-primary-light flex flex-col space-y-4 justify-center items-center '
    >
      <Icon
        icon='fluent:add-24-filled'
        className='h-16 w-16 text-primary-light fill-current'
      />
      <p className='font-bold text-base text-primary-light'>Add image</p>
    </button>
  )
}

export default AddImageBtn
