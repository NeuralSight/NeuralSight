import { useState } from 'react'
import { removeItemFromStorage } from '../helper/localStorageAccess'

async function logoutRequest(url: string) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()

    return data
  } catch (err: any) {
    return { error: err }
  }
}

export default function useLogout(url: string) {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)
  const [isSuccess, setIsSuccessfull] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const logout = async () => {
    setIsLoggingOut(true)
    const data = await logoutRequest(url)
    if (data.success) {
      removeItemFromStorage('activePatient') // remove the current active patient
      setIsLoggingOut(false)
      setIsSuccessfull(true)
    } else {
      setError(data.error)
      setIsSuccessfull(false)
    }
  }

  return { isLoggingOut, error, logout, isSuccess }
}
