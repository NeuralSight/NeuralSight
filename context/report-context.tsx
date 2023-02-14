import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ReactNode, createContext, useState } from 'react'
import { deleteAPatientReport, fetchPatientReport } from '../utils/config'

import {
  ErrorDetails,
  PatientInfoData,
  PatientReportResult,
  ReportContextType,
} from '../typings'
import useErrorMsgHandler from '../hooks/use-error-msg-handler'
// getting  report details on event trigger
// set report id one should be able to access the report
//set current active report
// set the index of the report
type Props = {
  children: ReactNode
}

type Data = {
  patient: PatientReportResult[]
}

const ReportContext = createContext<null | ReportContextType>(null)
const Provider = ReportContext.Provider

const ReportProvider = ({ children }: Props) => {
  const currentClient = useQueryClient()

  const [patientId, setPatientId] = useState<string>('')
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { detail, setDetails } = useErrorMsgHandler({ setError })
  const [currentId, setSetCurrentId] = useState<number>(0)
  const query = useQuery(
    ['patients', patientId],
    async () =>
      (await fetchPatientReport(patientId || '')).json() as Promise<Data>,
    {
      onSuccess: (data) => {
        console.log('data', data)
      },
      onError: (error: ErrorDetails[] | undefined) => {
        // setError
        setDetails(error)
      },
    }
  )

  const { mutate, isLoading, isSuccess } = useMutation(deleteAPatientReport)

  const getAllReport = (): PatientReportResult[] => {
    const patientReportArray: PatientReportResult[] = query.data?.patient || []
    return patientReportArray
  }
  // fetch report depending on the patient id set
  const getReportByKey = () => {
    const report: PatientReportResult | undefined = getAllReport().find(
      (item: PatientReportResult, key) => key == currentId
    )

    return report
  }

  const deleteSelectedPatientReport = (reportId: string) => {
    mutate(reportId, {
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
  return (
    <Provider
      value={{
        error,
        detail,
        setSetCurrentId,
        getAllReport,
        getReportByKey,
        deleteSelectedPatientReport,
        setPatientId,
        isLoading: query.isLoading,
        isSuccess: query.isSuccess,
        isError: query.isError,
        isDeletionLoading: isLoading,
        isDeletionSuccess: isSuccess,
      }}
    >
      {children}
    </Provider>
  )
}
export { ReportContext, ReportProvider }
