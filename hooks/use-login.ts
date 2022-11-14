import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeObjToFormUrlencoded } from '../helper/changeJsonToFormUrlencoded'
type AuthUser = {
  grant_type?: 'password' | string
  username: string
  password: string
  scope?: '' | string | null | undefined
  client_id?: string | null | undefined
  client_secret?: string | null | undefined
}

const headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
})

const loginUser = async (user: AuthUser) => {
  const urlencoded = changeObjToFormUrlencoded(user)
  // console.log('urlencoded', urlencoded)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEURALSIGHT_API_BASE_URL}/v1/login/access-token`,
    {
      mode: 'cors',
      method: 'POST',
      headers: headers,
      body: urlencoded,
    }
  )
  const data = await response.json()
  // console.log('data', data)
  return { data, status: response.status }
}

export default function useLogin() {
  const currentClient = useQueryClient()
  const onSubmit = useMutation(loginUser, {
    onSuccess(data) {
      // console.log('data', data)
      currentClient.invalidateQueries(['user'])
    },
    onError(err) {
      console.log('err', err)
    },
  })
  return onSubmit
}
