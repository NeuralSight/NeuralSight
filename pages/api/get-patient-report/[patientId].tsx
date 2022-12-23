// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPatientImageReport } from '../../../services/patient-api'
import { PatientReportResult, PatientInfoData } from '../../../typings'

type Data = {
  patient: PatientInfoData
  'patient report': PatientReportResult[]
}
export default async function getPatients(
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
  const response = await getPatientImageReport({
    patientId: patient || '',
    token: api_token,
  })
  const data: Data = (await response.json()) as Data
  // console.log('inference_path', data['patient report'][0].inference_path)
  res.status(response.status).json(data)
}
