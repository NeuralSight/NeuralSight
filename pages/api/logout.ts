import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { METHOD_NOT_ALLOWED_ERR_MSG } from '../../lang/errorMessages'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader(
      'Access-Control-Allow-Origin',
      process.env.ALLOWED_ORGINS || 'http://localhost:3000/'
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method == 'POST') {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('user', '', {
          httpOnly: true, // only read in backend
          secure: process.env.NODE_ENV !== 'development', //secure while in production
          expires: new Date(0), // expired long time ago
          sameSite: 'strict', // for more about same site - https://web.dev/samesite-cookies-expl...
          path: '/',
        })
      )
      res.status(200).json({ success: true })
    } else {
      res.status(405).json(METHOD_NOT_ALLOWED_ERR_MSG)
    }
  } catch (error) {
    res.status(500)
    console.log('error', error)
  }
}
