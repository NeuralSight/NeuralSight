// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { METHOD_NOT_ALLOWED_ERR_MSG } from '../../lang/error-messages'
import { updateUserInfo } from '../../services/user-api'
import { ApiError } from 'next/dist/server/api-utils'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'PUT') {
    try {
      const { cookies } = req
      const api_token = cookies.user || ''

      if (!api_token) {
        res.status(403).json({ detail: `unauthorized access` })
      }

      const response = await updateUserInfo(req, res, api_token)
      // console.log('data', data)
      const data = await response.json()

      res.status(response.status).json(data)
      if (!response.ok) {
        res
          .status(400)
          .json({ detail: `unexpected response ${response.statusText}` })
      }
    } catch (e: any) {
      console.log(e)
      if (e.statusCode) {
        res.status(e.statusCode).json({ detail: e.message })
      }
      res.status(500).json({ detail: e.message })
    }
  } else {
    return res.status(405).json({ detail: METHOD_NOT_ALLOWED_ERR_MSG })
  }
}
