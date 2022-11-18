import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('user', req.body.user, {
        httpOnly: true, // only read in backend
        secure: process.env.NODE_ENV !== 'development', //secure while in production
        maxAge: 60 * 60, // max Age by default 1 hour
        sameSite: 'strict', // for more about same site - https://web.dev/samesite-cookies-expl...
        path: '/',
      })
    )

    res.json({ sucess: true })
    res.statusCode = 302
    res.setHeader('Location', req.headers.referer || '/')
    res.end()
  } catch (error) {
    console.log('error', error)
    res.status(500)
  }
}
