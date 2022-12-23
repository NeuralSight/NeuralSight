import React from 'react'
import { ImageDetails, PatientReportResult } from '../../../typings'
import Image from 'next/legacy/image'
import useGetAWSfile from '../../../hooks/use-get-aws-file'

type Props = {
  imageDetails: ImageDetails
  patientReportResult: PatientReportResult
}

const ImageCard = ({ imageDetails, patientReportResult }: Props) => {
  // const imageQuery = useGetAWSfile(
  //   patientReportResult.details.inference_path,
  //   patientReportResult.details.id
  // )

  return (
    <div
      className='relative rounded-3xl border-2 w-full h-full transition-all ease-in duration-200 border-primary-light group group'
      title='click to edit on OHIF'
    >
      <Image
        src={imageDetails.src}
        alt={`patient's image testing ${imageDetails.disease}`}
        objectFit={'cover'}
        priority
        layout='fill'
        className='rounded-3xl'
      />
      <div className='rounded-3xl w-full h-fit absolute top-0 right-0 px-2 py-3 flex justify-between'>
        <div className='p-2 rounded-2xl my-auto bg-primary-dark text-gray-50 font-semibold text-sm uppercase shadow-lg shadow-primary-dark/25 group-hover:shadow-none text-center align-middle'>
          {imageDetails.modality}
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
    </div>
  )
}

export default ImageCard
