// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { deletePatient } from '../../../services/patient-api'

type Data = any
export default async function deletePatients(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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
  const response = await deletePatient({
    patientId: patient || '',
    token: api_token,
  })
  const data: Data = (await response.json()) as Data
  res.status(response.status).json(data)
}
