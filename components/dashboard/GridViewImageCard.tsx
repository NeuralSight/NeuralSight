import React from 'react'
import { ImageDetails } from '../../typings'
import Image from 'next/legacy/image'
import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import MoreDetails from './more-details-popover'

type Props = {
  imageDetails: ImageDetails
}

const GrdViewImageCard = ({ imageDetails }: Props) => {
  // const [isImageHover, setIsImageHover] = React.useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  // poppover props
  const open = Boolean(anchorEl)
  const id = open ? 'more-details' : undefined

  return (
    <div className='relative rounded-3xl border-2 border-gray-500/20 transition-all ease-in duration-200 hover:border-primary-light group h-[387px] lg:h-[300px] 2xl:h-[387px] w-full lg:w-[240px] 2xl:w-[282px] cursor-pointer group'>
      <Image
        src={imageDetails.src}
        alt={`patient's image testing ${imageDetails.disease}`}
        objectFit={'cover'}
        layout='fill'
        className='rounded-3xl'
      />
      <div className='rounded-3xl w-full h-fit absolute top-0 right-0 px-2 py-3 flex justify-between'>
        <div className='p-2 rounded-2xl my-auto bg-primary-dark text-gray-50 font-semibold text-sm uppercase shadow-lg shadow-primary-dark/25 group-hover:shadow-none text-center align-middle'>
          {imageDetails.modality}
        </div>
        <div
          className='w-fit h-fit rounded-full bg-slate-400/20'
          aria-describedby={id}
        >
          {/* icon button with relevant icon onClick dropDown*/}
          <IconButton size='small' type='button' onClick={handleClick}>
            <Icon
              icon='akar-icons:more-horizontal'
              className='h-6 w-6 fill-current text-gray-50'
            />
          </IconButton>
        </div>
      </div>

      <div
        className={
          'rounded-full py-3 w-full opacity-100 ease-in-out transition-opacity duration-300  h-fit absolute bottom-0  right-0 flex items-center justify-center text-center align-middle bg-primary-light/40 font-bold text-primary-dark text-sm'
        }
      >
        {/* show disease likelihood as summary maybe later it would be a bottomsheet for small devices for people to pull more info */}
        {imageDetails.disease}{' '}
        <span
          className={`
          ml-2
          ${
            imageDetails.inference < 0.5
              ? 'text-green-700'
              : imageDetails.inference > 0.75
              ? 'text-red-700'
              : 'text-orange-700'
          }`}
        >
          {imageDetails.inference < 0.5
            ? 'low chances'
            : imageDetails.inference > 0.5
            ? 'highly likely'
            : 'not sure'}
        </span>
      </div>
      <MoreDetails
        id={id}
        anchorEl={anchorEl}
        open={open}
        setAnchorElement={setAnchorEl}
      />
    </div>
  )
}

export default GrdViewImageCard
