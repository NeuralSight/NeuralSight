// Import required AWS SDK clients and commands for Node.js.
import { createWriteStream } from 'fs'
import { s3Bucket } from './aws_clients' // Helper function that creates an Amazon S3 service client module.
import { GetObjectCommand } from '@aws-sdk/client-s3'

const bucketParams = {
  Bucket: process.env.AWS_S3_BUCKET_NAME,
  Expires: 3000,
}
/**
 *
 * @param Key Key of the object to get.
 * @returns
 */
export const getObject = async (Key: string, name: string, ext: string) => {
  const file = createWriteStream(`/page/api/files/${name}.${ext}`)
  // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
  // Key?
  try {
    // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
    const data = await s3Bucket.send(
      new GetObjectCommand({ ...bucketParams, Key })
    )
    // Convert the ReadableStream to a string.
    return await data.Body?.transformToString()
  } catch (err) {
    console.log('Error', err)
  }
}
