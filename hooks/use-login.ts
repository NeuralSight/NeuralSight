import { timeoutSignal } from './../helper/timeoutSignal'
import { useMutation } from '@tanstack/react-query'
import { AuthUser } from '../typings'

type AuthInfo = {
  user: AuthUser
  isRemembered: boolean
}

const setUserAuthInfo = async ({ user, isRemembered }: AuthInfo) => {
  console.log('user', user)
  //store in react-cookies of access later instead
  const response = await fetch('/api/login', {
    signal: timeoutSignal(10).signal,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, remember: isRemembered }),
  })
  const data = await response.json()
  // console.log('data', data)
  return { data, status: response.status }
}

export default function useLogin() {
  const onSubmit = useMutation(setUserAuthInfo)
  return onSubmit
}
