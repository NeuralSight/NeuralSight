import { NextRequest } from 'next/dist/server/web/spec-extension/request'
import { NextResponse } from 'next/dist/server/web/spec-extension/response'

// helper function
function createNewUrl(urlPath: string, req: NextRequest): string {
  return new URL(urlPath, req.url).href
}

export function middleware(req: NextRequest) {
  const api_token = req.cookies.get('user')
  const url = req.url
  const matchers: String[] = []

  config.matchers.forEach((matcher) => {
    matchers.push(createNewUrl(matcher, req))
  })
  console.log('matchers', matchers)
  if (!api_token && matchers.includes(url)) {
    const urlClone = req.nextUrl.clone()
    urlClone.pathname = '/auth'
    return NextResponse.redirect(urlClone)
  }
  // console.log('auth', createNewUrl('/auth', req))
  if (
    api_token &&
    url.startsWith(createNewUrl('/auth', req)) &&
    !config.matchers.includes(url)
  ) {
    const urlClone = req.nextUrl.clone()
    urlClone.pathname = '/dashboard'
    console.log('urlClone 2', urlClone)
    return NextResponse.redirect(urlClone)
  }
}

const config = {
  matchers: ['/dashboard', '/report', '/settings', '/api/authorize'],
}
