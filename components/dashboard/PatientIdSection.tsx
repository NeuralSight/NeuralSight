import { Icon } from '@iconify/react'
import { useEffect, Dispatch, SetStateAction } from 'react'
import InputField from '../inputs/MUIInput'
import ListNavigationWrapper from '../ListNavigationWrapper'
import PatientIdCard from '../ListNavigationCard'
import { useQuery } from '@tanstack/react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  FIELD_REQUIRED_ERR_MSG,
  SERVER_ERR_MSG,
} from '../../lang/errorMessages'
import { fetchPatients } from '../../utils/config'
import Loading from '../../pages/loading'
import usePostPatient from '../../hooks/use-post-patient'
import { PatientResult } from '../../typings'
import { reverse } from '../../helper/reverseArray'
import PatientIdCardSkeleton from '../skeletons/PatientIdCard'
import { generateRandomString } from '../../helper/randomStringGenerator'

type Props = {
  active: string
  setActive: Dispatch<SetStateAction<string>>
}

type State = {
  patientId: string
}

// dark:bg-secondary-dark

function PatientIdSection({ active, setActive }: Props) {
  //hook for post patient
  const {
    setPatient,
    setError,
    patient,
    isLoading,
    isSuccess,
    status,
    detail,
    error,
    onClick,
  } = usePostPatient()

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<State>()

  const onHandleSubmit: SubmitHandler<State> = (data) => {
    onClick(data.patientId)
  }

  const query = useQuery(
    ['patients'],
    async () => (await fetchPatients()).json() as Promise<PatientResult[]>,
    {}
  )

  const NO_ID_TO_SHOW_BY_DEFAULT = 10
  const patientArr = query.data

  // sort to start with the latest use reverse function since the last element is latest
  const sortByDate = reverse(patientArr || [])

  // useEffect(() => {
  //   if (isSuccess) {
  //     setActive(sortByDate[0].id)
  //   }
  // }, [isSuccess, setActive, sortByDate])

  console.log('sortByDate', sortByDate)
  // slice the elements
  const filterTenLatest = sortByDate?.slice(0, NO_ID_TO_SHOW_BY_DEFAULT)
  // include a filter for the search query

  // skeleton values
  const skeletonArray = new Array(10)

  useEffect(() => {
    setTimeout(() => {
      setError(null)
      setPatient(null)
      clearErrors('patientId')
    }, 8000)
  }, [clearErrors, setError, setPatient])
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
          <form
            method='post'
            onSubmit={handleSubmit(onHandleSubmit)}
            className='flex flex-col space-y-0.5 py-2'
          >
            <InputField
              id='patientAdd'
              type='text'
              size='small'
              label='New ID'
              borderRadius='25px'
              register={register('patientId', {
                required: FIELD_REQUIRED_ERR_MSG,
              })}
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
            {errors.patientId?.message || error ? (
              <p className='text-red-500 text-bold text-sm italic py-1 w-full rounded-md bg-red-100/80 px-2'>
                {errors.patientId?.message || error}
              </p>
            ) : null}

            {isSuccess && patient ? (
              <p className='text-green-500 text-bold text-sm italic py-1 w-full rounded-md bg-green-100/80 px-2'>
                {patient} was added Successfully
              </p>
            ) : null}
            {isLoading ? (
              <p className='text-blue-500 text-bold text-sm italic py-1 w-full rounded-md bg-blue-100/80 px-2'>
                adding patient ...
              </p>
            ) : null}
          </form>
        </div>
      }
    >
      {query.isSuccess &&
        filterTenLatest?.map((patient) => (
          <PatientIdCard
            key={patient.id}
            idKey={patient.id}
            active={patient.id === active}
            setActive={setActive}
            className={`justify-center ${
              patient.id === active ? 'font-semibold' : ''
            }`}
          >
            {patient.id}
          </PatientIdCard>
        ))}
      {patientArr?.length == 0 && (
        <p className='text-base font-medium text-gray-500 px-3'>
          No Patient ID
        </p>
      )}
      {query.isLoading && (
        <div className='px-3 space-y-2'>
          {skeletonArray.map(() => (
            <PatientIdCardSkeleton
              key={generateRandomString(128)}
              height={'40px'}
            />
          ))}
        </div>
      )}
      {query.isError && (
        <p className='font-medium text-red-500 px-3'>{SERVER_ERR_MSG}</p>
      )}
    </ListNavigationWrapper>
  )
}

export default PatientIdSection
