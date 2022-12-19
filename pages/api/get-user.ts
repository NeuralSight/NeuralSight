// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../typings'
import { getUserImageReport } from '../../services/user-api'
type Data = User

export default async function getPatients(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { cookies } = req
  const api_token = cookies.user

  const response = await getUserImageReport(api_token || '')
  const data = (await response.json()) as Data
  console.log('data', data)
  res.status(response.status).json(data)
}
