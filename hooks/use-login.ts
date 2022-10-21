import { useMutation, useQueryClient } from '@tanstack/react-query'

type AuthUser = {
  grant_type?: 'password' | string
  username: string
  password: string
  scope?: '' | string | null | undefined
  client_id?: string | null | undefined
  client_secret?: string | null | undefined
}

const headers = new Headers({ 'Content-Type': 'application/json' })

const loginUser = async (user: AuthUser) => {
  // console.log('user', user)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEURALSIGHT_API_BASE_URL}/v1/login/access-token`,
    {
      mode: 'cors',
      method: 'POST',
      headers: headers,
      body: JSON.stringify(user),
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
