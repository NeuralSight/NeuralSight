import { Icon } from '@iconify/react'
import React from 'react'
import InputField from '../Input'
import PatientIdCard from './PatientIdCard'

type Props = {}

// dark:bg-secondary-dark

const patientIDs = [
  '600d475fa96e305as2e48c9cfbb851as',
  '600d475fa96e305as2e48c9cfbb851qs',
  '600d475fa96e305as2e48c9cfbb851qs',
  '600d475fa96e305as2e48c9cfbb851qs',
  '600d475fa96e305as2e48c9cfbb851qs',
  '600d475fa96e305as2e48c9cfbb851qs',
  '600d475fa96e305as2e48c9cfbb851qs',
  '00d475fa96e305as2e48c9cfbb851qs',
  '600d475fa96e305as2e48c9cfbb851qs',
]

function PatientIdSection({}: Props) {
  const [active, setActive] = React.useState<number>(0)
  return (
    <div className='w-full h-full border-2 border-primary-light rounded-[25px] bg-gray-50 py-5 px-3 flex flex-col space-y-6'>
      <InputField
        id='search'
        type='text'
        placeholder='Search Patient Id...'
        size='small'
        label='search'
        borderRadius='25px'
        icon={
          <Icon
            icon='ep:search'
            className='cursor-pointer w-6 h-6 fill-current text-zinc-500/50'
          />
        }
      />
      <InputField
        id='search'
        type='text'
        size='small'
        label='New ID'
        borderRadius='25px'
        icon={
          <button
            type='submit'
            className='absolute rounded-[25px] bg-gray-500/70 group-focus:group-hover:bg-primary-light flex justify-center items-center p-1.5 right-1 transition-all duration-200'
          >
            <Icon
              icon='akar-icons:person-add'
              className=' cursor-pointer w-5 h-5 fill-current text-gray-50'
            />
          </button>
        }
      />
      <div className='flex flex-col space-y-6 pr-6'>
        <div className='uppercase text-lg text-center underline underline-offset-2'>
          patient id
        </div>
        <div className='flex flex-col space-y-3 '>
          {patientIDs.map((patientId, key) => (
            <PatientIdCard
              id={patientId}
              key={key}
              idKey={key}
              active={key === active}
              handleActive={setActive}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PatientIdSection
