import { NextApiRequest, NextApiResponse } from 'next'
import { ContentType } from '../lang/content-type'
import { changeObjToFormUrlencoded } from '../helper/changeObjToOtherFormats'
import { Patient, PatientPredictImage, PatientUpdateReport } from '../typings'

const Url = `${process.env.NEXT_PUBLIC_NEURALSIGHT_API_BASE_URL}/patient`

// post image
export const postPatient = async ({ patientId, token }: Patient) => {
  const response = await fetch(Url + '/', {
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
export const predictPatientImage = async (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string
) => {
  const response = await fetch(`${Url}/predict`, {
    method: 'POST',
    responseType: 'stream',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': req.headers['content-type'],
      // api key
    }, // which is multipart/form-data with boundary included
    body: req,
  })
  // response.pipe(res)
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
  const response = await fetch(`${Url}/doctor/all`, {
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
  const response = await fetch(`${Url}/report/update/${reportId}`, {
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
