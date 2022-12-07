import Image from 'next/image'
import { ImageDetails } from '../../../typings'
import { formatStringDecimalToPercentage } from '../../../helper/AIResponseFormats'
import Button from '../../Button'
import { Icon } from '@iconify/react'
import ProgressBar from './ProgressBar'
import Inference from './Inference'
import { formatDate } from '../../../helper/datesFormatter'
import { useState } from 'react'

type Props = {
  imageDetails: ImageDetails
}
// placeholder date
const ListViewImageCard = ({ imageDetails }: Props) => {
  const [date, setDate] = useState<Date>(new Date())
  return (
    <div className='flex flex-col xl:flex-row w-full h-fit shadow-lg border-2 rounded-xl p-4 gap-6 bg-primary-lightest relative'>
      <button
        type='button'
        className='absolute top-4 right-[1%] p-2 h-fit w-fit flex items-center justify-center bg-zinc-300/80 rounded-full hover:bg-red-500/30 active:bg-red-500/30'
        arial-label='delete image'
        title='delete image'
      >
        {/* delete button will prompt the user if sure he want to delete in a small modal*/}
        <Icon
          icon='fluent:delete-16-regular'
          className='h-6 w-6 fill-current text-zinc-800'
        />
      </button>
      <div className='xl:w-1/3 w-full rounded-xl flex justify-center '>
        <Image
          src={imageDetails.src}
          alt={`patient's image testing ${imageDetails.disease}`}
          width={100}
          height={100}
          className='rounded-xl w-auto xl:w-full h-96 xl:h-80'
        />
        <div className='absolute top-4 left-4 z-10 p-2 rounded-2xl my-auto bg-primary-dark text-gray-50 font-semibold text-sm uppercase shadow-lg shadow-primary-dark/25 group-hover:shadow-none text-center align-middle'>
          {imageDetails.modality}
        </div>
      </div>
      <div className='w-full 2xl:w-2/3 flex flex-col space-y-8'>
        <div className='flex flex-col space-y-1'>
          <p className='text-gray-500 font-light italic h-full capitalize'>
            Last Edited {formatDate(date)}
          </p>
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
            <ProgressBar key={key} pathogen={pathogen} />
          ))}
        </div>
        <div className='flex flex-col space-y-2.5 '>
          <Inference inference={imageDetails.inference} />
          <div className='flex md:flex-nowrap lg:flex-wrap flex-wrap 2xl:flex-nowrap w-auto gap-3 justify-center items-center'>
            <Button type='button'>
              <Icon icon={'eva:edit-2-fill'} className='ml-2 h-5 w-5' />{' '}
              <div className='text-sm font-bold'>Edit </div>
            </Button>
            <Button type='button' outlined>
              {' '}
              <Icon icon={'eos-icons:ai'} className='ml-2 h-5 w-5' />{' '}
              <div className='text-sm font-bold'>View Report</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListViewImageCard
