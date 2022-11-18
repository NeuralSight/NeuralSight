// ImageDetails
export interface AnyObject {
  [key: string]: any
}
interface Pathogen {
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

export interface AuthContextType {
  authState: UserInfo
  setAuthState: (user: UserInfo) => void
  isUserAuthenticated: () => boolean
}
