import React from 'react'

type Props = {
  children: React.ReactNode
  isSuccess?: boolean
}

const ErrorMessage = (props: Props) => {
  return (
    <p
      className={`w-full py-3 px-6 text-white lg:text-lg font-medium tracking-wider transition-all duration-300 ease-in-out text-center ${
        props.isSuccess ? 'bg-green-500/90' : 'bg-red-500/90'
      }`}
    >
      {props.children}
    </p>
  )
}

export default ErrorMessage
