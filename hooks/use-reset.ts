import { useMutation } from '@tanstack/react-query'
import { ContentType } from '../lang/content-type'
import { changeObjToFormUrlencoded } from '../helper/changeObjToOtherFormats'

type ResetType = {
  token: string
  newPassword: string
}

const headers = new Headers({
  'Content-Type': ContentType.Json,
})

const resetPassword = async ({ token, newPassword }: ResetType) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEURALSIGHT_API_BASE_URL}/user/reset-password/`,
    {
      mode: 'cors',
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        token: token,
        new_password: newPassword,
      }),
    }
  )
  const data = await response.json()
  // console.log('data', data)
  return { data, status: response.status }
}

export default function useReset() {
  const onSubmit = useMutation(resetPassword, {
    onSuccess(data) {
      console.log('data', data)
    },
    onError(err) {
      console.log('err', err)
    },
  })
  return onSubmit
}
