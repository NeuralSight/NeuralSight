import Image from 'next/image'
import { ImageDetails } from '../../typings'
import { formatStringDecimalToPercentage } from '../../helper/AIResponseFormats'
import Button from '../Button'
import { Icon } from '@iconify/react'

type Props = {
  imageDetails: ImageDetails
}

const ListViewImageCard = ({ imageDetails }: Props) => {
  return (
    <div className='flex flex-col 2xl:flex-row w-full h-fit shadow-lg border-2 rounded-xl p-4 gap-6 bg-primary-lightest'>
      <div className='w-full h-80 2xl:w-1/3 relative rounded-xl'>
        <Image
          src={imageDetails.src}
          alt={`patient's image testing ${imageDetails.disease}`}
          objectFit={'cover'}
          layout='fill'
          className='rounded-xl'
        />
        <div className='absolute top-4 left-4 z-10 p-2 rounded-2xl my-auto bg-primary-dark text-gray-50 font-semibold text-sm uppercase shadow-lg shadow-primary-dark/25 group-hover:shadow-none text-center align-middle'>
          {imageDetails.modality}
        </div>
      </div>
      <div className='w-full 2xl:w-2/3 flex flex-col space-y-10'>
        <div className='flex flex-col space-y-1'>
          <h4 className='text-lg text-slate-500'>
            Disease &#8594;{' '}
            <span className='font-medium text-primary-dark'>
              {imageDetails.disease}
            </span>
          </h4>
          <div className='flex'>
            <h4 className='text-lg text-slate-500'>
              Pathogen&#91;found&#93; &#8594;{' '}
              <span className='text-primary-dark font-medium'>
                {`${imageDetails?.pathogens?.length} out of ${imageDetails?.totalPathogens}`}
              </span>
            </h4>
            {/* add view more incase the pathogen are alot */}
          </div>
        </div>
        <div className='flex flex-col space-y-2'>
          <h4 className='capitalize text-xl tracking-[4px] font-semibold underline decoration-slate-400 text-slate-700 mb-2 '>
            pathogens
          </h4>
          {imageDetails.pathogens?.map((pathogen, key) => (
            <div className='flex space-x-2.5 items-center' key={key}>
              <div className='w-1/4 text-slate-500 text-lg truncate' key={key}>
                {pathogen.type}
              </div>

              <div
                className='w-3/4 bg-gray-200 rounded-full h-fit border-2 border-gray-300'
                key={key}
              >
                <div
                  key={key}
                  className={`${
                    pathogen.confidence >= '0.75'
                      ? 'bg-[#37dabe]/70'
                      : pathogen.confidence < '0.75' &&
                        pathogen.confidence >= '0.5'
                      ? 'bg-[#49b267]/80'
                      : pathogen.confidence < '0.5' &&
                        pathogen.confidence > '0.29'
                      ? 'bg-orange-500/70'
                      : 'bg-red-600/70'
                  } text-xs font-bold text-primary-dark text-center p-1 leading-none rounded-full border-r-2 border-gray-300`}
                  style={{
                    width: `${formatStringDecimalToPercentage(
                      pathogen?.confidence || '0'
                    )}%`,
                  }}
                  title={`${formatStringDecimalToPercentage(
                    pathogen.confidence
                  )}%`}
                >
                  {formatStringDecimalToPercentage(pathogen.confidence)}%
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col space-y-2.5 '>
          <div className='flex space-x-2 items-center'>
            <p className='text-lg text-gray-400 font-normal capitalize'>
              Likelihood:
            </p>
            <div
              className={`px-2.5 py-1 rounded-lg  font-bold ${
                imageDetails.inference > 0.75
                  ? 'bg-red-500/20 text-red-600'
                  : imageDetails.inference > 0.5 &&
                    imageDetails.inference < 0.75
                  ? 'bg-orange-500/20 text-orange-600'
                  : 'bg-green-500/20 text-green-600'
              }`}
            >
              {imageDetails.inference > 0.75
                ? 'high'
                : imageDetails.inference > 0.5 && imageDetails.inference < 0.75
                ? 'medium'
                : 'low'}
            </div>
          </div>
          <div className='flex flex-wrap 2xl:flex-nowrap w-auto gap-3 justify-center items-center'>
            <Button type='button'>
              <Icon icon={'eva:edit-2-fill'} className='ml-2 h-5 w-5' />{' '}
              <div className='text-sm font-bold'>Edit in OHIF</div>
            </Button>
            <Button type='button' outlined>
              {' '}
              <Icon icon={'eos-icons:ai'} className='ml-2 h-5 w-5' />{' '}
              <div className='text-sm font-bold'>Re-detect</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListViewImageCard
