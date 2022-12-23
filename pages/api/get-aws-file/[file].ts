// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getObject } from '../../../lib/aws-get-object'
import { GetObjectCommandOutput } from '@aws-sdk/client-s3'

const BASE_INFERENCE_PATH = 'Images/inference/'
const BASE_ANNOTATION_PATH = 'Images/annotations/'
const TXT_EXT = 'txt'

export default async function getFilePaths(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const { cookies } = req
    // const api_token = cookies.user || ''

    console.log('works')

    let { file } = req.query

    if (file && typeof file != 'string') {
      // incase of string array this might change or never
      file = file[0]
    } else {
      file = file || ''
    }
    const fileArr = file.split('.')

    console.log('file', file)
    let uploadPath = ''
    if (fileArr[1] == TXT_EXT) {
      uploadPath = BASE_ANNOTATION_PATH + file
    } else {
      uploadPath = BASE_INFERENCE_PATH + file
    }
    console.log('file extension', fileArr[1])
    const url = await getObject(uploadPath, fileArr[0], fileArr[1])
    console.log('URL -----------------------', url)
  } catch (error) {
    console.log('error', error)
  }
}
