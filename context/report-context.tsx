import { useQuery } from '@tanstack/react-query'
import { ReactNode, createContext, useState } from 'react'
import { fetchPatientReport } from '../utils/config'

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
  const [patientId, setPatientId] = useState<string>('')
  console.log('patientId', patientId)
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

  // const imageQuery= useQuery([patientId,"image"], async () =>
  //     (await (patientId || '')).json() as Promise<Data>)

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
  return (
    <Provider
      value={{
        error,
        detail,
        setSetCurrentId,
        getAllReport,
        getReportByKey,
        setPatientId,
        isLoading: query.isLoading,
        isSuccess: query.isSuccess,
        isError: query.isError,
      }}
    >
      {children}
    </Provider>
  )
}
export { ReportContext, ReportProvider }
