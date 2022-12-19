import AWS from 'aws-sdk'
// Set the AWS Region.
// Create an Amazon S3 service client object.
export const s3Bucket = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: 'v4',
  region: process.env.AWS_REGION, // ex) us-west-2
})
