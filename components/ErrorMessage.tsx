import React from 'react'

type Props = {
  children: React.ReactNode
}

const ErrorMessage = (props: Props) => {
  return (
    <p className='w-full py-4 px-12 rounded-md bg-red-300 text-red-500 font-medium'>
      {props.children}
    </p>
  )
}

export default ErrorMessage
