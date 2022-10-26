import React from 'react'
import { ImageDetails } from '../../typings'
import Image from 'next/image'
import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'

type Props = {
  imageDetails: ImageDetails
}

const GrdViewImageCard = ({ imageDetails }: Props) => {
  return (
    <div className='relative rounded-3xl border-2 hover:border-primary-light group h-[387px] w-[282px]'>
      <Image
        src={imageDetails.src}
        alt={`patient's image testing ${imageDetails.disease}`}
        objectFit={'cover'}
        layout='fill'
        className='rounded-3xl'
      />
      <div className='rounded-3xl w-full h-fit absolute top-0 right-0 px-2 py-3 flex justify-between'>
        <div className='p-2 rounded-2xl bg-primary-dark text-gray-50 font-semibold text-sm uppercase shadow-lg shadow-primary-dark/25 group-hover:shadow-none'>
          {imageDetails.modality}
        </div>
        <div>
          {/* icon button with relevant icon onClick dropDown*/}
          <IconButton size='small'>
            <Icon
              icon='fluent:add-24-filled'
              className='h-7 w-7 fill-current text-gray-50'
            />
          </IconButton>
        </div>
      </div>
      <div className='rounded-full py-3 w-full h-fit absolute bottom-0  right-0 flex items-center justify-center text-center align-middle bg-primary-light/40 font-bold text-gray-900 text-sm '>
        {/* show disease likelihood as summary maybe later it would be a bottomsheet for small devices for people to pull more info */}
        {imageDetails.disease}{' '}
        <span
          className={`
          ml-2
          ${
            imageDetails.inference < 0.5
              ? 'text-green-700'
              : imageDetails.inference > 0.5
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
    </div>
  )
}

export default GrdViewImageCard
