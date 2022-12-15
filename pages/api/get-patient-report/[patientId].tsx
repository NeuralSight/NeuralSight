// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPatientImageReport } from '../../../services/patient-api'
import { PatientResult } from '../../../typings'

export default async function getPatients(
  req: NextApiRequest,
  res: NextApiResponse<PatientResult[]>
) {
  const { cookies } = req
  const api_token = cookies.user || ''
  let patient = ''
  const { patientId } = req.query
  if (patientId && typeof patientId != 'string') {
    // incase of string array this might change or never
    patient = patientId[0]
  } else {
    patient = patientId || ''
  }
  const response = await getPatientImageReport({
    patientId: patient || '',
    token: api_token,
  })
  const data = await response.json()
  console.log('data', data)
  res.status(response.status).json(data?.patients || data)
}
