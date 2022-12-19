import { ReactNode, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext } from 'react'
import { PatientResult } from '../typings'
import { reverse } from '../helper/reverseArray'
import { fetchPatients } from '../utils/config'
import { PatientContextType } from '../typings'

type Props = {
  children: ReactNode
}

const NO_ID_TO_SHOW_BY_DEFAULT = 10

const PatientContext = createContext<PatientContextType | null>(null)

const PatientProvider = ({ children }: Props) => {
  const currentClient = useQueryClient()
  const [patient, setPatient] = useState<string>('')
  const query = useQuery(
    ['patients'],
    async () => (await fetchPatients()).json() as Promise<PatientResult[]>,
    {
      // onSuccess onError onFinish
      onSuccess: (data: PatientResult[]) => {
        currentClient.setQueryData(['patients'], data)
        // only if their is an id then set it
        data[0] && setPatient(data[0].id)
      },
    }
  )
  // query status
  const isLoading = () => query.isLoading
  const isSuccess = () => query.isSuccess
  const isError = () => query.isError

  const getPatientsInfo = (): PatientResult[] => {
    const patientArr = query.data
    // sort to start with the latest use reverse function since the last element is latest
    const sortByDate = reverse(patientArr || [])
    return sortByDate
  }

  const NoOfPatientDisplayByDefault = (
    NO: number,
    sortByDate: PatientResult[]
  ): PatientResult[] => {
    // slice the elements
    const filterTenLatest = sortByDate?.slice(0, NO || NO_ID_TO_SHOW_BY_DEFAULT)
    return filterTenLatest
  }
  const samplePatientContext: PatientContextType = {
    patientId: patient,
    query: query,
    setPatientInfo: setPatient,
    getPatientsInfo,
    getLatestPatient: NoOfPatientDisplayByDefault,
    isLoading,
    isSuccess,
    isError,
  }
  return (
    <PatientContext.Provider value={samplePatientContext}>
      {children}
    </PatientContext.Provider>
  )
}

export { PatientContext, PatientProvider }
