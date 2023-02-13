// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { deletePatientReport } from '../../../services/patient-api'

type Data = any
export default async function deletePatientsReport(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { cookies } = req
  const api_token = cookies.user || ''
  let report = ''
  const { reportId } = req.query
  if (reportId && typeof reportId != 'string') {
    // incase of string array this might change or never
    report = reportId[0]
  } else {
    report = reportId || ''
  }
  const response = await deletePatientReport({
    reportId: report || '',
    token: api_token,
  })
  const data: Data = (await response.json()) as Data
  res.status(response.status).json(data)
}
