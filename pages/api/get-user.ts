// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Detail, User } from '../../typings'
import { getUserImageReport } from '../../services/user-api'
type Data = User

export default async function getPatients(
  req: NextApiRequest,
  res: NextApiResponse<User | Detail>
) {
  try {
    const { cookies } = req
    const api_token = cookies.user

    if (!api_token) {
      res.status(403).json({ detail: `unauthorized access` })
    }

    const response = await getUserImageReport(api_token || '')
    const data = (await response.json()) as Data
    console.log('data', data)
    res.status(response.status).json(data)
  } catch (e: any) {
    console.log(e)
    if (e.statusCode) {
      res.status(e.statusCode).json({ detail: e.message })
    }
    res.status(500).json({ detail: e.message })
  }
}
