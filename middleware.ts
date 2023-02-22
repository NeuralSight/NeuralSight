import { NextRequest } from 'next/dist/server/web/spec-extension/request'
import { NextResponse } from 'next/dist/server/web/spec-extension/response'

export function middleware(req: NextRequest) {
  // const secret = process.env.SECRET

  // console.log('first', process.env.ALLOWED_ORGINS)
  const api_token = req.cookies.get('user')
  const url = req.url
  // console.log('api_token', api_token)
  if (!api_token && config.matchers.includes(url)) {
    const urlClone = req.nextUrl.clone()
    urlClone.pathname = '/auth'
    console.log('url', urlClone)
    return NextResponse.redirect(urlClone)
  }
  if (
    api_token &&
    url.startsWith('http://localhost:3000/auth') &&
    !config.matchers.includes(url)
  ) {
    const urlClone = req.nextUrl.clone()
    urlClone.pathname = '/dashboard'
    console.log('urlClone 2', urlClone)
    return NextResponse.redirect(urlClone)
  }
}

export const config = {
  matchers: [
    'http://localhost:3000/dashboard',
    'http://localhost:3000/report',
    'http://localhost:3000/settings',
  ],
}
