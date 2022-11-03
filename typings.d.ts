// ImageDetails

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
