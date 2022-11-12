import { Icon } from '@iconify/react'
import { useState } from 'react'
import InputField from '../inputs/MUIInput'
import ListNavigationWrapper from '../ListNavigationWrapper'
import PatientIdCard from '../ListNavigationCard'

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
  '6440d475s96e305as2e48c9cfbb851qs',
  '600d475fa96e305as2e48c9cfbb851qs',
  '600d475fa96e305as2e48c9cfbb851qs',
  '00d475fa96e305as2e48c9cfbb851qs',
  '600d475fa96e305as2e48c9cfbb851qs',
]

function PatientIdSection({}: Props) {
  const [active, setActive] = useState<number>(0)
  return (
    <ListNavigationWrapper
      title='patient&#39;s id'
      topComponent={
        <div className='flex flex-col space-y-6 px-3'>
          {' '}
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
                title='add patient'
              >
                <Icon
                  aria-label='add patient using Patients Id'
                  icon='akar-icons:person-add'
                  className=' cursor-pointer w-5 h-5 fill-current text-gray-50'
                />
              </button>
            }
          />
        </div>
      }
    >
      {patientIDs.map((patientId, key) => (
        <PatientIdCard
          key={key}
          idKey={key}
          active={key === active}
          setActive={setActive}
          className={`justify-center ${key === active ? 'font-semibold' : ''}`}
        >
          {patientId}
        </PatientIdCard>
      ))}
    </ListNavigationWrapper>
  )
}

export default PatientIdSection
