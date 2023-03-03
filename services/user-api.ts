import { NextApiRequest, NextApiResponse } from 'next'
import { ContentType } from '../lang/content-type'

import { NewUser, User } from '../typings'

const Url = `${process.env.NEXT_PUBLIC_NEURALSIGHT_API_BASE_URL}/users`
// get a user
export const getUserImageReport = async (token: string) => {
  const response = await fetch(`${Url}/me`, {
    headers: {
      'Content-Type': ContentType.Json,
      Authorization: `Bearer ${token}`,
    },
  })
  return response
}
// post a user
export const postUser = async (user: NewUser, token: string) => {
  const response = await fetch(Url, {
    method: 'POST',
    headers: {
      'Content-Type': ContentType.Json,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
  return response
}
// update user information

export const updateUserInfo = async (req: any, res: any, token: string) => {
  const response = await fetch(`${Url}/profile/update`, {
    method: 'PUT',
    // responseType: 'stream',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': req.headers['content-type'],
      // api key
    }, // which is multipart/form-data with boundary included
    body: req,
    // duplex: 'half',
  })
  // response.pipe(res)

  return response
}
