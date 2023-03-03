import React from 'react'
import { PatientReportResult } from '../../../typings'
import Image from 'next/legacy/image'
import { TOTAL_PATHOGENS } from '../../../lang/constants'

type Props = {
  patientReportResult: PatientReportResult
}

const ImageCard = ({ patientReportResult }: Props) => {
  console.log('patient report', patientReportResult)
  // const imageQuery = useGetAWSfile(
  //   patientReportResult.details.inference_path,
  //   patientReportResult.details.id
  // )
  const inferencePath = patientReportResult.details.inference_path
  // split
  const inferenceArr = inferencePath.split('/')

  const imageType = inferenceArr[1]
  const fileName = inferenceArr[2]

  const pathogens = patientReportResult.disease.split('\n')

  return (
    <div
      className='relative rounded-3xl border-2 w-full h-full transition-all ease-in duration-200 border-primary-light group group'
      title='click to edit on OHIF'
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_NEURALSIGHT_API_BASE_URL}/patient/file/${imageType}/${fileName}`}
        alt={`patient's image testing `}
        objectFit={'cover'}
        priority
        layout='fill'
        className='rounded-3xl'
      />
      <div className='rounded-3xl w-full h-fit absolute top-0 right-0 px-2 py-3 flex justify-between'>
        <div className='p-2 rounded-2xl my-auto bg-primary-dark text-gray-50 font-semibold text-sm uppercase shadow-lg shadow-primary-dark/25 group-hover:shadow-none text-center align-middle'>
          CT
        </div>
      </div>

      <div
        className={
          'rounded-full py-3 w-full opacity-100 ease-in-out transition-opacity duration-300  h-fit absolute bottom-0  right-0 flex items-center justify-center text-center align-middle bg-primary-light/40 font-bold text-primary-dark text-sm'
        }
      >
        {/* show disease likelihood as summary maybe later it would be a bottomsheet for small devices for people to pull more info */}
        Pathogen&#91;found&#93; &#8594;{' '}
        <span className='text-primary-dark font-semibold'>
          {`${
            pathogens.length > 1 ? pathogens.length : 0
          } out of ${TOTAL_PATHOGENS}`}
        </span>
      </div>
    </div>
  )
}

export default ImageCard
