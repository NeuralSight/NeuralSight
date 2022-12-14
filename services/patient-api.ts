import { ContentType } from '../lang/content-type'
import {
  changeObjToFormUrlencoded,
  changeObjToFormData,
} from '../helper/changeObjToOtherFormats'
import { Patient, PatientPredictImage, PatientUpdateReport } from '../typings'

const Url = `${process.env.NEXT_PUBLIC_NEURALSIGHT_API_BASE_URL}/patient`

// post image
export const postPatient = async ({ patientId, token }: Patient) => {
  const response = await fetch(Url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': ContentType.FormData,
    },
    body: changeObjToFormUrlencoded({ patient_id: patientId }),
  })
  return response
}

// post patient image for prediction
export const predictPatientImage = async ({
  patientId,
  token,
  file,
}: PatientPredictImage) => {
  const formdata = changeObjToFormData({ patient_id: patientId, file })
  console.log('formdata', formdata)
  const response = await fetch(`${Url}/predict`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': undefined,
    },
    body: formdata,
  })
  return response
}

// get patient by id
export const getPatientImageReport = async ({ patientId, token }: Patient) => {
  const response = await fetch(`${Url}/${patientId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': ContentType.FormData,
    },
  })
  return response
}

// get all all patient
export const getAllPatients = async (token: string) => {
  const response = await fetch(Url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': ContentType.FormData,
    },
  })
  return response
}

// update report
export const updatePatientReport = async ({
  reportId,
  report,
  token,
}: PatientUpdateReport) => {
  const response = await fetch(`${Url}/${reportId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': ContentType.FormData,
    },
    body: changeObjToFormUrlencoded({ report }),
  })
  return response
}

// delete patient
export const deletePatient = async ({ patientId, token }: Patient) => {
  const response = await fetch(`${Url}/${patientId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': ContentType.FormData,
    },
  })
  return response
}
