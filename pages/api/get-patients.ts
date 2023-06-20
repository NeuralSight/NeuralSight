// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllPatients } from '../../services/patient-api'
import { PatientResult, Detail } from '../../typings'

type Data = {
  patients: PatientResult[]
}

export default async function getPatients(
  req: NextApiRequest,
  res: NextApiResponse<PatientResult[] | Detail>
) {
  try {
    const { cookies } = req
    const api_token = cookies.user
    if (!api_token) {
      res.status(403).json({ detail: `unauthorized access` })
    }

    const response = (await getAllPatients(api_token || '')) as Response
    const data = (await response.json()) as Data
    res.status(response.status).json(data?.patients || [])
  } catch (e: any) {
    console.log(e)
    if (e.statusCode) {
      res.status(e.statusCode).json({ detail: e.message })
    }
    res.status(500).json({ detail: e.message })
  }
}
