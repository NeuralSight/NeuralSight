// Import required AWS SDK clients and commands for Node.js.
import { s3Bucket } from './aws_clients' // Helper function that creates an Amazon S3 service client module.

const bucketParams = {
  Bucket: process.env.AWS_S3_BUCKET_NAME,
  Expires: 3000,
}
/**
 *
 * @param Key Key of the object to get.
 * @returns
 */
export const getObject = async (Key: string) => {
  try {
    // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
    // Key?
    const url = await s3Bucket
      .getSignedUrlPromise('getObject', { ...bucketParams, Key })
      .catch((err) => {
        console.error('Error', err)
      })
    // Convert the ReadableStream to a string.
    return url
  } catch (err) {
    console.error('Error', err)
  }
}
