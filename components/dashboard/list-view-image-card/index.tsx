import Image from 'next/image'
import {
  AnyObject,
  ImageDetails,
  Pathogen,
  PatientReportResult,
} from '../../../typings'
import Button from '../../Button'
import { Icon } from '@iconify/react'
import ProgressBar from './ProgressBar'
import Inference from './Inference'
import { formatDateFromString } from '../../../helper/datesFormatter'
import { useState } from 'react'
import DeleteReportModal from '../DeleteReportModal'
import Link from 'next/link'
import { TOTAL_PATHOGENS } from '../../../lang/constants'

type Props = {
  patientDetailsResult: PatientReportResult
}

// placeholder date
const ListViewImageCard = ({ patientDetailsResult }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const diseaseArr: Pathogen[] = []
  const pathogens = patientDetailsResult.disease.split('\n')
  // {
  //   confidence:
  //   type:
  // }
  for (let pathogen of pathogens) {
    const pathogenArr = pathogen.split(' ')
    const diseasesPresentObj: AnyObject = {}
    diseasesPresentObj['confidence'] = pathogenArr[0]
    diseasesPresentObj['type'] = pathogenArr[1]
    diseaseArr.push(diseasesPresentObj)
  }
  const inferencePath = patientDetailsResult.details.inference_path
  // split
  const inferenceArr = inferencePath.split('/')

  const imageType = inferenceArr[1]
  const fileName = inferenceArr[2]

  return (
    <div className='flex flex-col xl:flex-row w-full h-fit shadow-lg border-2 rounded-xl p-4 gap-6 bg-primary-lightest relative'>
      <button
        type='button'
        className='absolute top-4 right-[1%] p-2 h-fit w-fit flex items-center justify-center bg-zinc-300/80 rounded-full hover:bg-red-500/30 active:bg-red-500/30'
        arial-label='delete image'
        title='delete image'
        onClick={() => setIsOpenModal(true)}
      >
        {/* delete button will prompt the user if sure he want to delete in a small modal*/}
        <Icon
          icon='fluent:delete-16-regular'
          className='h-6 w-6 fill-current text-zinc-800'
        />
      </button>
      <div className='xl:w-1/3 w-full rounded-xl flex justify-center'>
        <div className='relative rounded-3xl border-2 border-gray-500/20 group h-[387px] lg:h-[300px] 2xl:h-[430px] w-full lg:w-[240px] 2xl:w-[300px] cursor-pointer'>
          <Image
            src={`${process.env.NEXT_PUBLIC_NEURALSIGHT_API_BASE_URL}/patient/file/${imageType}/${fileName}`}
            alt={`patient's image testing `}
            fill
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPsrgcAAZsBDIKsyq4AAAAASUVORK5CYII='
            className='rounded-xl object-cover'
          />
        </div>
        <div className='absolute top-4 left-4 z-10 p-2 rounded-2xl my-auto bg-primary-dark text-gray-50 font-semibold text-sm uppercase shadow-lg shadow-primary-dark/25 group-hover:shadow-none text-center align-middle'>
          CT
        </div>
      </div>
      <div className='w-full 2xl:w-2/3 flex flex-col justify-between'>
        <div className='flex flex-col mt-1'>
          <p className='text-gray-500 font-light italic h-full capitalize'>
            Last Edited{' '}
            {formatDateFromString(patientDetailsResult.details.created_at)}
          </p>
          {/* <h4 className='text-lg text-slate-500'>
            Disease &#8594;{' '}
            <span className='font-medium text-primary-dark'>
              {imageDetails.disease}
            </span>
          </h4> */}
        </div>
        <div className='flex flex-col space-y-2'>
          <h4 className='text-lg text-slate-500 mb-2'>
            Pathogen&#91;found&#93; &#8594;{' '}
            <span className='text-primary-dark font-medium'>
              {`${
                diseaseArr.length > 1 ? diseaseArr.length : 0
              } out of ${TOTAL_PATHOGENS}`}
            </span>
          </h4>
          <h4 className='capitalize text-xl tracking-[4px] font-semibold underline decoration-slate-400 text-slate-700 mb-2 '>
            pathogens
          </h4>
          {diseaseArr.length > 1 &&
            diseaseArr.map((pathogen, key) => (
              <ProgressBar key={key} pathogen={pathogen} />
            ))}
        </div>
        <div className='flex flex-col space-y-2.5 '>
          {/* <Inference inference={diseaseArr} /> */}
          <div className='grid grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 w-auto gap-3 justify-center items-center'>
            <Button type='button'>
              <Icon icon={'eva:edit-2-fill'} className='ml-2 h-5 w-5' />{' '}
              <div className='text-sm font-bold'>Edit </div>
            </Button>
            <Link href={'/report'}>
              <Button type='button' outlined>
                {' '}
                <Icon icon={'eos-icons:ai'} className='ml-2 h-5 w-5' />{' '}
                <div className='text-sm font-bold'>View Report</div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <DeleteReportModal
        open={isOpenModal}
        setOpen={setIsOpenModal}
        reportId={patientDetailsResult.details.id}
      />
    </div>
  )
}

export default ListViewImageCard
