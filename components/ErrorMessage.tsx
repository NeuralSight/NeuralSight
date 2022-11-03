import React from 'react'

type Props = {
  children: React.ReactNode
}

const ErrorMessage = (props: Props) => {
  return (
    <p
      className={`w-full py-3 px-6 text-white bg-red-500/90 lg:text-lg font-medium tracking-wider transition-all duration-300 ease-in-out text-center`}
    >
      {props.children}
    </p>
  )
}

export default ErrorMessage
