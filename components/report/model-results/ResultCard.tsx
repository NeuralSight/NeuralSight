import React from 'react'
import { formatStringDecimalToPercentage } from '../../../helper/AIResponseFormats'

type Props = {
  type: string
  confidence: string
}

const ResultCard = (props: Props) => {
  const result =
    formatStringDecimalToPercentage(props.confidence) >= '75' ? 'YES' : 'NO'
  return (
    <div className='flex w-full pl-8 pr-2 items-center'>
      <p className='font-medium text-base text-zinc-800 capitalize tracking-wide'>
        {props.type}
      </p>
      <div className='h-0.5 rounded-full w-full bg-zinc-800/90 mx-2'></div>
      <p
        className={`font-bold uppercase tracking-wide ${
          result != 'YES' ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {result}
      </p>
    </div>
  )
}

export default ResultCard
