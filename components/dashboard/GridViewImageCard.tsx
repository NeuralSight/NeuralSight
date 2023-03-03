import { useState } from 'react'
import {
  AnyObject,
  ImageDetails,
  Pathogen,
  PatientReportResult,
} from '../../typings'
import Image from 'next/image'
import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import MoreDetails from './more-details-popover'
import { formatDateFromString } from '../../helper/datesFormatter'
import DeleteReportModal from './DeleteReportModal'
import { TOTAL_PATHOGENS } from '../../lang/constants'

type Props = {
  patientDetailsResult: PatientReportResult
}

// placeholder date

const GrdViewImageCard = ({ patientDetailsResult }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const diseaseArr: Pathogen[] = []
  const pathogens = patientDetailsResult.disease.split('\n')

  for (let pathogen of pathogens) {
    const pathogenArr = pathogen.split(' ')
    const diseasesPresentObj: AnyObject = {}
    diseasesPresentObj['confidence'] = pathogenArr[0]
    diseasesPresentObj['type'] = pathogenArr[1]
    diseaseArr.push(diseasesPresentObj)
  }

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
        alt={`patient's image testing `}
        fill
        sizes='max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPsrgcAAZsBDIKsyq4AAAAASUVORK5CYII='
        className='rounded-3xl object-cover'
      />
      <div className='rounded-3xl w-full h-fit absolute top-0 right-0 px-2 py-3 flex justify-between'>
        <div className='p-2 rounded-2xl my-auto bg-primary-dark text-gray-50 font-semibold text-sm uppercase shadow-lg shadow-primary-dark/25 group-hover:shadow-none text-center align-middle'>
          CT
        </div>
        <div
          className='w-fit h-fit rounded-full bg-slate-400/20'
          aria-describedby={id}
        >
          {/* icon button with relevant icon onClick dropDown*/}
          <IconButton
            size='small'
            type='button'
            onClick={handleClick}
            // sx={{ background: '' }}
          >
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
          Pathogen&#91;found&#93; &#8594;{' '}
          <span className='text-primary-dark font-semibold'>
            {`${
              diseaseArr.length > 1 ? diseaseArr.length : 0
            } out of ${TOTAL_PATHOGENS}`}
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
        setDeleteModal={setIsOpenModal}
      />
      <DeleteReportModal
        open={isOpenModal}
        setOpen={setIsOpenModal}
        reportId={patientDetailsResult.details.id}
      />
    </div>
  )
}

export default GrdViewImageCard
