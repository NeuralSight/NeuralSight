import { useMutation } from '@tanstack/react-query'
import { ContentType } from '../lang/content-type'

const headers = new Headers({
  'Content-Type': ContentType.FormData,
})

const recoverPassword = async (email: string) => {
  // console.log('urlencoded', urlencoded)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEURALSIGHT_API_BASE_URL}/user/password-recovery/${email}`,
    {
      mode: 'cors',
      method: 'POST',
      headers: headers,
    }
  )
  const data = await response.json()
  // console.log('data', data)
  return { data, status: response.status }
}

export default function useRecover() {
  const onSubmit = useMutation(recoverPassword, {
    onSuccess(data) {
      console.log('data', data)
    },
    onError(err) {
      console.log('err', err)
    },
  })
  return onSubmit
}
