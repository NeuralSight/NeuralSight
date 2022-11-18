import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
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
    res.status(200)
    res.json({ sucess: true })
  } catch (error) {
    res.status(500)
    console.log('error', error)
  }
}
