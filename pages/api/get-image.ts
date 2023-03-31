// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../typings'
import { getPatientImage } from '../../services/patient-api'
import { createWriteStream } from 'fs'
// type Data = User

export default async function getImage(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { cookies } = req
  const api_token = cookies.user

  const response = await getPatientImage(api_token || '')
  // const data = await response.json()
  // console.log('data', data)
  // res.status(response.status).json(data)
  // console.log('type', response.headers.ContentType)
  const file = createWriteStream(`/page/api/files/1.${'png'}}`)
  // response.body?.pipeTo(file)
  console.log('file', file)
  return response.body
}
