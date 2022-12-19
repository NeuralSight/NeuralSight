// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getObject } from '../../../lib/aws-get-object'

const BASE_PATH = 'Images/annotation/'

export default async function getFilePaths(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cookies } = req
  const api_token = cookies.user || ''

  console.log('works')

  let { file } = req.query
  if (file && typeof file != 'string') {
    // incase of string array this might change or never
    file = file[0]
  } else {
    file = file || ''
  }
  console.log('file', file)

  const url = await getObject(file)
  // do a http request to download
  // please note that the responseType is stream

  // do all it takes until you return the right format annotation i.e download the file read it and return the values

  if (url) {
    res.status(200).json(url)
  } else {
    res.status(404).json('not found')
  }
}
