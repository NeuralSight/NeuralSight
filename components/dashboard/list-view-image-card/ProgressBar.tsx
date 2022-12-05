import { formatStringDecimalToPercentage } from '../../../helper/AIResponseFormats'
import { Pathogen } from '../../../typings'

type Props = {
  pathogen: Pathogen
}

const ProgressBar = ({ pathogen }: Props) => {
  return (
    <div className='flex space-x-2.5 items-center'>
      <div className='w-1/4 text-slate-500 text-lg truncate'>
        {pathogen.type}
      </div>

      <div className='w-3/4 bg-gray-50 rounded-full h-fit border-2 border-gray-300'>
        <div
          className={`${
            pathogen.confidence >= '0.75'
              ? 'bg-[#37dabe]/70'
              : pathogen.confidence < '0.75' && pathogen.confidence >= '0.5'
              ? 'bg-[#49b267]/80'
              : pathogen.confidence < '0.5' && pathogen.confidence > '0.29'
              ? 'bg-orange-500/70'
              : 'bg-red-600/70'
          } text-xs font-bold text-primary-dark text-center p-1 leading-none rounded-full border-r-2 border-gray-300`}
          style={{
            width: `${formatStringDecimalToPercentage(
              pathogen?.confidence || '0'
            )}%`,
          }}
          title={`${formatStringDecimalToPercentage(pathogen.confidence)}%`}
        >
          {formatStringDecimalToPercentage(pathogen.confidence)}%
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
