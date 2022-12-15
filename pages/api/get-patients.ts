// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllPatients } from '../../services/patient-api'
import { PatientResult } from '../../typings'

type Data = {
  patients: PatientResult[]
}
export default async function getPatients(
  req: NextApiRequest,
  res: NextApiResponse<PatientResult[]>
) {
  const { cookies } = req
  const api_token = cookies.user
  const response = (await getAllPatients(api_token || '')) as Response
  const data = (await response.json()) as Data
  res.status(response.status).json(data?.patients || [])
}
