import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('first', process.env.ALLOWED_ORGINS)
    res.setHeader(
      'Access-Control-Allow-Origin',
      process.env.ALLOWED_ORGINS || 'http://localhost:3000/'
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    // if (req.method == 'OPTIONS') {
    //   res.setHeader(
    //     'Access-Control-Allow-Methods',
    //     'PUT, POST, PATCH, DELETE, GET'
    //   )
    const { cookies } = req
    const api_token = cookies.user

    console.log('api_token', api_token)
    if (api_token) {
      // okay
      //TODO:remember to unexpose the token and other critcal backend inf such as the key
      res.status(201).json(api_token)
    } else {
      // unauthorized
      res.status(403).json(null)
    }
    // } else {
    //   res.status(403).json('not allowed method')
    // }
  } catch (error) {
    res.statusCode = 500
    console.log('oops error -', error)
  }
}
