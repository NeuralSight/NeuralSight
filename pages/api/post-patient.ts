// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { METHOD_NOT_ALLOWED_ERR_MSG } from '../../lang/error-messages'
import { postPatient } from '../../services/patient-api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    const { cookies } = req
    const api_token = cookies.user
    const patientId = JSON.parse(req.body)
    const response = await postPatient({ token: api_token || '', patientId })
    const data = await response.json()
    res.status(response.status).json(data)
  } else {
    return res.status(405).json({ detail: METHOD_NOT_ALLOWED_ERR_MSG })
  }
}
