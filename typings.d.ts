import { Dispatch, SetStateAction } from 'react'

// ImageDetails
interface AnyObject {
  [key: string]: any
}
interface Pathogen {
  type?: string
  confidence?: string
}
interface ImageDetails {
  patientID: string
  modality: string
  src: string | import('../dist/client/image').StaticImageData
  disease: string
  inference: number
  pathogens: Pathogen[]
  totalPathogens: string | number
}

interface FileInfo {
  lastModified?: number
  lastModifiedDate?: string
  name: string
  size: number
  type: 'image/jpeg' | 'image/png' | 'image/dicom' | string
  webkitRelativePath: string
}

interface FileTypeError {
  type: 'FILETYPE_ERR' | 'FILESIZE_ERR' | 'FILES_SELECTED_ERR'
  message?: string | 'oops something went wrong'
}

interface UserInfo {
  access_token: string
  token_type?: string
}

// context types
interface PatientContextType {
  patientId: string | undefined
  query: UseQueryResult<PatientResult[]>
  setPatientInfo: Dispatch<SetStateAction<string>>
  getPatientsInfo: () => PatientResult[]
  getSearchedPatient: (searchValueKey: string) => PatientResult[]
  getLatestPatient: (NO: number) => PatientResult[]
  deletePatient: (patientId: string) => void
  isLoadingDeletion: boolean
  isLoading: () => boolean
  isError: () => boolean
  isSuccess: () => boolean
}

interface UserContextType {
  // setUserInfo: () => Dispatch
  getUserInfo: () => User | undefined
  isLoading: () => boolean
  isError: () => boolean
  isSuccess: () => boolean
}

interface ReportContextType {
  error: string | null
  detail: string | ErrorDetails[] | undefined
  setSetCurrentId: Dispatch<SetStateAction<number>>
  setPatientId: Dispatch<SetStateAction<string>>
  getAllReport: () => PatientReportResult[]
  getReportByKey: () => PatientReportResult | undefined
  deleteSelectedPatientReport: (reportId: string) => void
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}
interface AuthContextType {
  authState: string | undefined | null
  setAuthState: (user: UserInfo) => void
  getAuthState: () => void
  setIsRemembered: Dispatch<SetStateAction<boolean>>
  isUserAuthenticated: () => boolean
}

// fast api error
interface ErrorDetails {
  loc: Array<string>
  msg: string
  type: string
}

// patient types
interface Patient {
  patientId: string
  token: string
}
interface Report {
  reportId: string
}

interface PatientPredictImage {
  formdata: FormData
  token: string
}
interface PatientUpdateReport extends Report {
  token: string
  report: string
}

interface PatientReport extends Report {
  report: string
}

interface NewUser {
  firstname: string
  lastname: string
  address: string
  location: string
  phone: string
}
interface PasswordUpdate {
  oldpass: string
  newpass: string
  confirmpass: string
}
// user types
interface User {
  email?: string
  full_name: string
  address: string
  location: string
  userProfile: string | File | null
  phone: string
  hospital?: string
  is_active?: boolean
  is_superuser?: boolean
}
interface UserError {
  detail: string
}
interface UserWithoutFile {
  email?: string
  full_name: string
  address: string
  location: string
  phone: string
  hospital?: string
  is_active?: boolean
  is_superuser?: boolean
}

// backend data
interface PatientResult {
  created_at: string
  id: string
  updated_at: string
  user_id: number
}

interface PatientReportResult {
  disease: string
  details: {
    annotation_path: string
    created_at: string
    id: string
    inference_path: string
    patient_id: string
    report: string | null
    updated_at: string
  }
}

interface PatientInfoData {
  created_at: string
  id: string
  report: PatientReportResult[]
  updated_at: string
  user_id: number
}
