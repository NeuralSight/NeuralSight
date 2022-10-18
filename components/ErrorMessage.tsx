import React from 'react'

type Props = {
  children: React.ReactNode
}

const ErrorMessage = (props: Props) => {
  return (
    <p
      className={`w-full py-3 px-6 rounded-lg bg-red-400/40 text-red-500 font-medium transition-all duration-300 ease-in-out`}
    >
      {props.children}
    </p>
  )
}

export default ErrorMessage
