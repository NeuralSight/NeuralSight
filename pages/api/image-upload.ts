// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { METHOD_NOT_ALLOWED_ERR_MSG } from '../../lang/error-messages'
import { predictPatientImage } from '../../services/patient-api'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    try {
      const { cookies } = req
      const api_token = cookies.user || ''

      const response = await predictPatientImage(req, res, api_token)
      // console.log('data', data)
      const data = await response.json()
      res.status(response.status).json(data)
      if (!response.ok) {
        throw new Error(`unexpected response ${response.statusText}`)
      }
    } catch (e: any) {
      console.log(e)
      res.status(500).json({ detail: e.message })
    }
  } else {
    return res.status(405).json({ detail: METHOD_NOT_ALLOWED_ERR_MSG })
  }
}
