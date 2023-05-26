import { NextRequest } from 'next/dist/server/web/spec-extension/request'
import { NextResponse } from 'next/dist/server/web/spec-extension/response'

// helper function
function createNewUrl(urlPath: string, req: NextRequest): string {
  return new URL(urlPath, req.url).href
}

/**
 * Auth Middleware - Global middleware
 * ----------------
 * i understand from next 13 their can be middleware for every page{subfolder} which while run first for that page
 * @param req
 * @returns
 */
export function middleware(req: NextRequest) {
  const api_token = req.cookies.get('user')
  console.log('middle_api_token', api_token)
  const url = req.url
  const matchers: String[] = []

  config.matchers.forEach((matcher) => {
    matchers.push(createNewUrl(matcher, req))
  })
  // console.log('matchers', matchers)
  if (api_token?.value == undefined && matchers.includes(url)) {
    const urlClone = req.nextUrl.clone()
    urlClone.pathname = '/auth'
    return NextResponse.redirect(urlClone)
  }
  if (
    api_token &&
    api_token.name == 'user' &&
    api_token.value != 'undefined' &&
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
