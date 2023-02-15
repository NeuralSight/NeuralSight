import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { METHOD_NOT_ALLOWED_ERR_MSG } from '../../lang/error-messages'

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
        cookie.serialize('user', req.body.user, {
          // httpOnly: true, // only read in backend
          secure: process.env.NODE_ENV !== 'development', //secure while in production
          maxAge: req.body.remember ? 7 * 24 * 60 * 60 : 24 * 60 * 60, // max Age by default 1 day if remember is true then 1 week
          // sameSite: 'strict', // for more about same site - https://web.dev/samesite-cookies-expl...
          path: '/',
        })
      )

      // res.statusCode = 302
      res.status(302).json({ sucess: true })
      // allows a server to identify referring pages that people are visiting from or where requested resources are being used
      res.setHeader('Location', req.headers.referer || '/')
      // end the response process
      res.end()
    } else {
      res.status(405).json(METHOD_NOT_ALLOWED_ERR_MSG)
    }
  } catch (error) {
    console.log('error', error)
    res.statusCode = 500
  }
}
