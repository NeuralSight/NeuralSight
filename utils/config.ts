import { PatientReport, User, UserWithoutFile } from './../typings.d'
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

export const fetchPatientReport = async (patientId: string | number) => {
  return await fetch(`/api/get-patient-report/${patientId}`)
}

// post and predict a patient image
export const postPatientImage = async ({
  patientId,
  file,
}: PostPatientImage) => {
  const formdata = changeObjToFormData({ patient_id: patientId, file })
  const response = await fetch(`/api/image-upload`, {
    method: 'POST',
    body: formdata,
  })
  return response
}

//  update patient report
export const updatePatientReport = async ({
  reportId,
  report,
}: PatientReport) => {
  const stringified = JSON.stringify(report)
  return await fetch(`/api/update-patient-report/${reportId}`, {
    method: 'PUT',
    body: stringified,
  })
}

// get user info

export const fetchUserInfo = async () => {
  const response = await (await fetch(`/api/get-user`)).json()

  return response
}

// update user info

export const updateUser = async (user: User | UserWithoutFile) => {
  console.log('user', user)
  const formdata = changeObjToFormData(user)
  const response = await fetch(`/api/update-user`, {
    method: 'PUT',
    body: formdata,
  })
  return response
}
