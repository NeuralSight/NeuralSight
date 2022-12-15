// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { updatePatientReport } from '../../../services/patient-api'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { cookies } = req
  const api_token = cookies.user

  let { reportId } = req.query

  if (reportId && typeof reportId != 'string') {
    // incase of string array this might change or never
    reportId = reportId[0]
  } else {
    reportId = reportId || ''
  }

  const report = JSON.parse(req.body)
  const response = await updatePatientReport({
    token: api_token || '',
    reportId,
    report,
  })
  const data = await response.json()
  res.status(response.status).json(data)
}
