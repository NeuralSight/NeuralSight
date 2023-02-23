import { Icon } from '@iconify/react'
import { useEffect, ChangeEvent, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useContext } from 'react'
import InputField from '../inputs/MUIInput'
import ListNavigationWrapper from '../ListNavigationWrapper'
import PatientIdCard from '../ListNavigationCard'
import { generateRandomString } from '../../helper/randomStringGenerator'
import {
  FIELD_REQUIRED_ERR_MSG,
  SERVER_ERR_MSG,
} from '../../lang/error-messages'
import usePostPatient from '../../hooks/use-post-patient'
import PatientIdCardSkeleton from '../skeletons/PatientIdCard'
import { PatientContext } from '../../context/patient-context'
import { PatientContextType, PatientResult } from '../../typings'
import { getStorageItem, setStorageItem } from '../../helper/localStorageAccess'
import { PATIENT_ID_STORAGE_KEY } from '../../lang/constants'
import { useQueryClient } from '@tanstack/react-query'

type State = {
  patientId: string
}

// dark:bg-secondary-dark

function PatientIdSection() {
  const [searchValue, setSearchValue] = useState<string>('')
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
  const currentClient = useQueryClient()

  const patientContext = useContext<PatientContextType | null>(PatientContext)

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<State>()

  const onHandleSubmit: SubmitHandler<State> = (data) => {
    onClick(data.patientId)
    setStorageItem(PATIENT_ID_STORAGE_KEY, data.patientId)
  }

  let patientIdsArr: PatientResult[] = []

  const patientFiltered = patientContext?.getSearchedPatient(searchValue)
  const filterTenLatest = patientContext?.getLatestPatient(10)
  const isQueryLoading = patientContext?.isLoading()
  const isQueryError = patientContext?.isError()
  const isQuerySuccess = patientContext?.isSuccess()
  if (searchValue && patientFiltered) {
    patientIdsArr = patientFiltered
  }
  if (!searchValue && filterTenLatest) {
    patientIdsArr = filterTenLatest
  }
  // skeleton values
  const skeletonArray: number[] = new Array(10).fill(128)
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
            isUsingReactHookForm={false}
            value={searchValue}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              setSearchValue(target.value)
            }}
            // register={register('search')}
            borderRadius='25px'
            icon={
              <Icon
                icon='ep:search'
                className='cursor-pointer w-6 h-6 fill-current text-zinc-500/50'
                // onClick={}
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
                  className='absolute rounded-[25px] bg-gray-500/70 hover:bg-primary-light flex justify-center items-center p-1.5 right-1 transition-all duration-200'
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
            {/* messages */}
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
      {isQuerySuccess &&
        patientIdsArr?.map((patient) => (
          <PatientIdCard
            key={patient.id}
            idKey={patient.id}
            active={patient.id === getStorageItem(PATIENT_ID_STORAGE_KEY)}
            setActive={patientContext?.setPatientId}
            className={`justify-center ${
              patient.id === getStorageItem(PATIENT_ID_STORAGE_KEY)
                ? 'font-semibold'
                : ''
            }`}
          >
            {patient.id}
          </PatientIdCard>
        ))}
      {/* {patientInfoArr?.length == 0 && (
        <p className='text-base font-medium text-gray-500 px-3'>
          No Patient ID
        </p>
      )} */}
      {isQueryLoading && (
        <div className='px-3 space-y-2'>
          {skeletonArray.map((item: number) => (
            <PatientIdCardSkeleton
              key={generateRandomString(item)}
              height={'40px'}
            />
          ))}
        </div>
      )}
      {isQueryError && (
        <p className='font-medium text-red-500 px-3'>{SERVER_ERR_MSG}</p>
      )}
    </ListNavigationWrapper>
  )
}

export default PatientIdSection
