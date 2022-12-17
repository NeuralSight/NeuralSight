import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CONNECTION_ERR_MSG } from '../lang/errorMessages'
import { ErrorDetails } from '../typings'

interface ErrorHandler {
  setError: Dispatch<SetStateAction<string | null>>
}

/**
 *
 * @param {ErrorHandler} error.setError error state handler
 * @returns  setDetails and detail
 */

export default function useErrorMsgHandler({ setError }: ErrorHandler) {
  const [detail, setDetails] = useState<ErrorDetails[] | string | undefined>()
  useEffect(() => {
    if (detail && typeof detail == 'string') {
      setError(detail)
    } else if (detail && typeof detail != 'string') {
      detail.forEach((element: ErrorDetails) => {
        setError(element.msg)
        console.log('type', element.type)
        console.log('loc', element.loc)
      })
    } else {
      console.log(CONNECTION_ERR_MSG)
      // setError(CONNECTION_ERR_MSG)
    }
  }, [detail, setError])
  return { setDetails, detail }
}
