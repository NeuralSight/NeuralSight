// ImageDetails

interface Pathogen {
  type: string
  confidence: number | string | undefined
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
