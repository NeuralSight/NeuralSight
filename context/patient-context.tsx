import { ReactNode, useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { createContext } from 'react'
import { PatientResult } from '../typings'
import { reverse } from '../helper/reverseArray'
import { fetchPatients, deleteAPatient } from '../utils/config'
import { PatientContextType } from '../typings'

type Props = {
  children: ReactNode
}

const NO_ID_TO_SHOW_BY_DEFAULT = 10

const PatientContext = createContext<PatientContextType | null>(null)

const PatientProvider = ({ children }: Props) => {
  const currentClient = useQueryClient()
  const [patient, setPatient] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const query = useQuery(
    ['patients'],
    async () => (await fetchPatients()).json() as Promise<PatientResult[]>,
    {
      // onSuccess onError onFinish
      onSuccess: (data: PatientResult[]) => {
        currentClient.setQueryData(['patients'], data)
        // only if their is an id then set it
        data[0] && setPatient(data[data.length - 1].id)
      },
    }
  )

  // delete mutation
  const { mutate, isLoading, isSuccess } = useMutation(deleteAPatient)

  // query status
  const isLoadingQuery = () => query.isLoading
  const isSuccessQuery = () => query.isSuccess
  const isError = () => query.isError

  /**
   *
   * @returns {PatientResult[]} returns a sorted by date array of all patients from the api
   */
  const getPatientsInfo = (): PatientResult[] => {
    const patientArr = query.data
    // sort to start with the latest use reverse function since the last element is latest

    const sortByDate = reverse(patientArr || [])
    return sortByDate
  }

  /**
   *
   * @param {string} searchValueKey this the value from the search param
   * @returns {PatientResult[]} all found result if any
   */
  const getSearchedPatient = (searchValueKey: string): PatientResult[] => {
    if (searchValueKey == '') {
      return getPatientsInfo()
    }
    const patientSorted = getPatientsInfo()
    const patientFound = patientSorted.filter((item: PatientResult) =>
      item.id.includes(searchValueKey)
    )
    return patientFound
  }

  const deleteSelectedPatient = (patientId: string) => {
    mutate(patientId, {
      onSuccess: (data, variable, context) => {
        if (data.status === 200) {
          console.log('data', data)
          currentClient.invalidateQueries()
        }
      },
      onError: (error, variables, context) => {
        console.log(error)
      },
      onSettled: (data, error, variables, context) => {
        console.log('settled')
      },
    })
  }

  /**
   * @param {number} NO number of ids to show by default
   * @param {PatientResult[]} patientIds this the array return of all patients ids sorted by date
   * @returns {PatientResult[]} this is the filtered array by the number at NO
   */
  const NoOfPatientDisplayByDefault = (NO: number): PatientResult[] => {
    // slice the elements
    const filterTenLatest = getPatientsInfo()?.slice(
      0,
      NO || NO_ID_TO_SHOW_BY_DEFAULT
    )
    return filterTenLatest
  }
  const samplePatientContext: PatientContextType = {
    patientId: patient,
    query: query,
    setPatientInfo: setPatient,
    getPatientsInfo,
    getLatestPatient: NoOfPatientDisplayByDefault,
    getSearchedPatient,
    deletePatient: deleteSelectedPatient,
    isLoadingDeletion: isLoading,
    isLoading: isLoadingQuery,
    isSuccess: isSuccessQuery,
    isError,
  }
  return (
    <PatientContext.Provider value={samplePatientContext}>
      {children}
    </PatientContext.Provider>
  )
}

export { PatientContext, PatientProvider }
