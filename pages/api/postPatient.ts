// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { postPatient } from '../../services/patient-api'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { cookies } = req
  const api_token = cookies.user
  const patientId = JSON.parse(req.body)
  const response = await postPatient({ token: api_token || '', patientId })
  const data = await response.json()
  res.status(response.status).json(data)
}
