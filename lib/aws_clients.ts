import { S3 } from '@aws-sdk/client-s3'
// Set the AWS Region.
// Create an Amazon S3 service client object.
console.log('accessKey', process.env.AWS_ACCESS_KEY)
export const s3Bucket = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || '',
  },
})
