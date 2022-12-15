/**
 * all the request to api will be written here
 */

import { changeObjToFormData } from '../helper/changeObjToOtherFormats'

type PostPatientImage = {
  patientId: string
  file: File | undefined
}

// any header to be passed in here
const header = new Headers({})

// fetch patient from next
export const fetchPatients = async () => await fetch('/api/get-patients')

// post patient  from next
export const postPatient = async (patientId: string) => {
  return await fetch('/api/post-patient', {
    method: 'POST',
    body: JSON.stringify(patientId),
  })
}
// fetch patients reports

export const fetchPatientReport = async (patientId: string) =>
  await fetch(`/api/get-patient-report/${patientId}`)

// post and predict a patient image
export const postPatientImage = async ({
  patientId,
  file,
}: PostPatientImage) => {
  const formdata = changeObjToFormData({ patient_id: patientId, file })
  const response = await fetch(
    `http://d1fa-197-248-65-3.ngrok.io/v1/api/image-upload`,
    {
      method: 'POST',
      body: formdata,
    }
  )
  return response
}
//  update patient report

export const updatePatientReport = async (reportId: string, report: string) =>
  await fetch(`/api/update-patient-report/${reportId}`, {
    method: 'PUT',
    body: JSON.stringify(report),
  })
