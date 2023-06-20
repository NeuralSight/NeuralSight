/**
 * TODO: seperate each type into smaller files and in one folder"types"
 */

import { NextApiRequest } from 'next'
import { Dispatch, SetStateAction } from 'react'

// ImageDetails
export interface AnyObject {
  [key: string]: any
}
export interface Pathogen {
  type?: string
  confidence?: string
}
export interface ImageDetails {
  patientID: string
  modality: string
  src: string | import('../dist/client/image').StaticImageData
  disease: string
  inference: number
  pathogens: Pathogen[]
  totalPathogens: string | number
}

export interface FileInfo {
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

// context types
export interface PatientContextType {
  patientId: string | undefined
  query: UseQueryResult<PatientResult[]>
  setPatientId: Dispatch<SetStateAction<string>>
  getPatientsInfo: () => PatientResult[]
  getSearchedPatient: (searchValueKey: string) => PatientResult[]
  getLatestPatient: (NO: number) => PatientResult[]
  deletePatient: (patientId: string) => void
  isLoadingDeletion: boolean
  isLoading: () => boolean
  isError: () => boolean
  isSuccess: () => boolean
}

export interface UserContextType {
  // setUserInfo: () => Dispatch
  getUserInfo: () => User | undefined
  isLoading: () => boolean
  isError: () => boolean
  isSuccess: () => boolean
}

export interface ReportContextType {
  error: string | null
  detail: string | ErrorDetails[] | undefined
  setSetCurrentId: Dispatch<SetStateAction<number>>
  setPatientId: Dispatch<SetStateAction<string>>
  getAllReport: () => PatientReportResult[]
  getReportByKey: () => PatientReportResult | undefined
  sortByDate: (a: PatientReportResult[]) => PatientReportResult[]
  deleteSelectedPatientReport: (reportId: string) => void
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  isDeletionLoading: boolean
  isDeletionSuccess: boolean
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

export interface NewUser {
  firstname: string
  lastname: string
  address: string
  location: string
  phone: string
}
export interface PasswordUpdate {
  oldpass: string
  newpass: string
  confirmpass: string
}
// user types
export interface User {
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
export interface UserError {
  detail: string
}
export interface UserWithoutFile {
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
export interface PatientResult {
  created_at: string
  id: string
  updated_at: string
  user_id: number
}

export interface PatientReportResult {
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

export interface PatientInfoData {
  created_at: string
  id: string
  report: PatientReportResult[]
  updated_at: string
  user_id: number
}

export interface AuthUser {
  grant_type?: 'password' | string
  username: string
  password: string
  scope?: '' | string | null | undefined
  client_id?: string | null | undefined
  client_secret?: string | null | undefined
}

export interface Detail {
  details?: string
  detail?: string
}
