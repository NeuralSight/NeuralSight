import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { postPatient } from '../utils/config'
import useErrorMsgHandler from './use-error-msg-handler'

export default function usePostPatient() {
  const [error, setError] = useState<string | null>(null)
  const [patient, setPatient] = useState<string | null>('')

  // use query
  const currentClient = useQueryClient()
  const { setDetails, detail } = useErrorMsgHandler({ setError })
  // mutation for adding new patient
  const { isLoading, mutate, status, isSuccess } = useMutation(postPatient, {
    onMutate: async (newPatient) => {
      console.log('newPatient', newPatient)
    },
  })

  const onClick = (patientId: string) => {
    mutate(patientId, {
      onSuccess: async (response, variable, context) => {
        const data = await response.json()
        if (response.status === 201 || response.status === 200) {
          console.log('data', data)
          setPatient(data?.patient?.id)
          currentClient.invalidateQueries(['patients'])
        } else {
          const detail = data.detail
          console.log('detail', detail)
          setDetails(detail)
        }
      },
      onError: async (err: any, variables, context) => {
        setError(err)
        console.log('Error while posting...', err)
        console.log('data sent is', variables)
      },
      onSettled: async () => {
        console.log('settled')
      },
    })
  }

  return {
    error,
    patient,
    detail,
    isLoading,
    isSuccess,
    status,
    setPatient,
    setError,
    mutate,
    onClick,
  }
}
