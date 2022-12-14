import { ContentType } from '../lang/content-type'
import {
  changeObjToFormUrlencoded,
  changeObjToFormData,
} from '../helper/changeObjToOtherFormats'
import { UserId, UserToken, UserUpdate } from '../typings'

const Url = `${process.env.NEXT_PUBLIC_NEURALSIGHT_API_BASE_URL}/user`
// get a user
export const getUserImageReport = async ({ userId, token }: UserId) => {
  const response = await fetch(`${Url}/${userId}`, {
    headers: {
      Authorization: token,
      'Content-Type': ContentType.FormData,
    },
  })
  return response
}
// post a user
export const postUser = async ({ user, token }: UserToken) => {
  const response = await fetch(Url, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': ContentType.FormData,
    },
    body: changeObjToFormUrlencoded(user),
  })
  return response
}
// update user information

export const updateUserInfo = async ({ user, userId, token }: UserUpdate) => {
  const response = await fetch(`${URL}/${userId}`, {
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-Type': ContentType.FormData,
    },
    body: JSON.stringify(user),
  })
  return response
}
