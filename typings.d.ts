import { Dispatch, SetStateAction } from 'react'

// ImageDetails
export interface AnyObject {
  [key: string]: any
}
export interface Pathogen {
  type: string
  confidence: string
}
export interface ImageDetails {
  patientID: string
  modality: string
  src: string | import('../dist/client/image').StaticImageData
  disease: string
  inference: number | string
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

export interface FileTypeError {
  type: 'FILETYPE_ERR' | 'FILESIZE_ERR' | 'FILES_SELECTED_ERR'
  message?: string | 'oops something went wrong'
}

export interface UserInfo {
  access_token: string
  token_type?: string
}

export interface PatientContextType {
  patientId: string | undefined
  query: UseQueryResult<PatientResult[]>
  setPatientInfo: Dispatch<SetStateAction<string>>
  getPatientsInfo: () => PatientResult[]
  getLatestPatient: (NO: number, sortByDate: PatientResult[]) => PatientResult[]
  isLoading: () => boolean
  isError: () => boolean
  isSuccess: () => boolean
}

export interface AuthContextType {
  authState: string | undefined | null
  setAuthState: (user: UserInfo) => void
  getAuthState: () => void
  setIsRemembered: Dispatch<SetStateAction<boolean>>
  isUserAuthenticated: () => boolean
}

// fast api error
export interface ErrorDetails {
  loc: Array<string>
  msg: string
  type: string
}

// patient types
export interface Patient {
  patientId: string
  token: string
}
export interface Report {
  reportId: string
}

export interface PatientPredictImage {
  formdata: FormData
  token: string
}
export interface PatientUpdateReport extends Report {
  token: string
  report: string
}
export interface PatientReport extends Report {
  report: string
}

// user types
interface User {
  name: string
  email: string
  phone: string
  address: string
  location: string
  hospital: string
  userProfile: File // user image
}
export interface UserToken {
  user: User
  token: string
}
export interface UserId {
  token: string
  userId: string
}

export interface UserUpdate extends UserId {
  user: User
}

// backend data
export interface PatientResult {
  created_at: string
  id: string
  updated_at: string
  user_id: number
}

export interface PatientReportResult {
  annotation_path: string
  created_at: string
  id: string
  inference_path: string
  patient_id: string
  report: string | null
  updated_at: string
}

export interface PatientInfoData {
  created_at: string
  id: string
  report: PatientReportResult[]
  updated_at: string
  user_id: number
}
