import { useState } from 'react'
import { ImageDetails, PatientReportResult } from '../../typings'
import Image from 'next/image'
import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import MoreDetails from './more-details-popover'
import { formatDateFromString } from '../../helper/datesFormatter'

type Props = {
  imageDetails: ImageDetails
  patientDetailsResult: PatientReportResult
}

// placeholder date

const GrdViewImageCard = ({ imageDetails, patientDetailsResult }: Props) => {
  // const [isImageHover, setIsImageHover] = React.useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  // poppover props
  const open = Boolean(anchorEl)
  const id = open ? 'more-details' : undefined

  const inferencePath = patientDetailsResult.details.inference_path
  // split
  const inferenceArr = inferencePath.split('/')

  const imageType = inferenceArr[1]
  const fileName = inferenceArr[2]

  return (
    <div className='relative rounded-3xl border-2 border-gray-500/20 transition-all ease-in duration-200 hover:border-primary-light group h-[387px] lg:h-[300px] 2xl:h-[387px] w-full lg:w-[240px] 2xl:w-[282px] cursor-pointer group'>
      <Image
        src={`${process.env.NEXT_PUBLIC_NEURALSIGHT_API_BASE_URL}/patient/file/${imageType}/${fileName}`}
        alt={`patient's image testing ${imageDetails.disease}`}
        fill
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPsrgcAAZsBDIKsyq4AAAAASUVORK5CYII='
        className='rounded-3xl object-cover'
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
          'rounded-3xl pt-2.5 pb-1 w-full ease-linear transition-all duration-1000 absolute bottom-0 right-0 flex flex-col items-center justify-center text-center align-middle group-hover:bg-gradient-to-b group-hover:from-primary-light/30 group-hover:via-primary-light/40 group-hover:to-primary-lightest font-bold text-primary-dark text-sm group-hover:h-fit h-0'
        }
      >
        {/* show disease likelihood as summary maybe later it would be a bottomsheet for small devices for people to pull more info */}
        <div className='mb-0.5 hidden group-hover:flex'>
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
        <p className='text-gray-500 font-light italic h-full capitalize hidden group-hover:block'>
          last edited{' '}
          {formatDateFromString(patientDetailsResult.details.created_at)}
        </p>
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
