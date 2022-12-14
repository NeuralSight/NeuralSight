import { Icon } from '@iconify/react'
import { useState, ChangeEvent, useContext, useEffect } from 'react'
import InputField from '../inputs/MUIInput'
import ListNavigationWrapper from '../ListNavigationWrapper'
import PatientIdCard from '../ListNavigationCard'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postPatient } from '../../services/patient-api'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FIELD_REQUIRED_ERR_MSG } from '../../lang/errorMessages'
import { AuthContext } from '../../context/auth-context'
import { Patient } from '../../typings'
import useErrorMsgHandler from '../../hooks/use-error-msg-handler'

type Props = {}

type State = {
  patientId: string
}

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
  const [error, setError] = useState<string | null>(null)
  const [patient, setPatient] = useState<string | null>(null)

  const { setDetails, detail } = useErrorMsgHandler({ setError })

  // authContext
  const authContext = useContext(AuthContext)
  // Token
  const token = authContext?.authState

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<State>()

  // use query
  const currentClient = useQueryClient()

  const { isLoading, mutate, status, isSuccess } = useMutation(postPatient, {
    onMutate: async (newPatient) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      // await currentClient.cancelQueries('patients')
      // Snapshot the previous value
      // const previousPatients = currentClient.getQueryData('patients')
      // Optimistically update to the new value
      // currentClient.setQueryData('patients', (old) => [...old, newPatient])
      // Return a context object with the snapshotted value
      // return { previousPatients }
      console.log('newPatient', newPatient)
    },
  })
  const onHandleSubmit: SubmitHandler<State> = (data) => {
    console.log('data', data)
    console.log('token', token)
    const AddPatient: Patient = {
      patientId: data.patientId,
      token: token || '',
    }
    mutate(AddPatient, {
      onSuccess: async (response, variable, context) => {
        const data = await response.json()
        if (response.status === 201 || response.status === 200) {
          console.log('data', data)
          setPatient(data?.patient?.id)
          // currentClient.invalidateQueries('patient')
        } else {
          const detail = data.detail
          console.log('detail', detail)
          setDetails(detail)
        }
      },
      onError: async (err: any, variables, context) => {
        // currentClient.setQueryData('patient', context.previousPatients)
        setError(err)
        console.log('Error while posting...', err)
        console.log('data sent is', variables)
      },
      onSettled: async () => {
        // currentClient.invalidateQueries('patient')
      },
    })
  }
  useEffect(() => {
    setTimeout(() => {
      setError(null)
      setPatient(null)
      clearErrors('patientId')
    }, 8000)
  }, [clearErrors, setError])
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
              id='search'
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
