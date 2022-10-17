import React from 'react'

type Props = {
  children: React.ReactNode
  outlined: boolean | undefined
  type: 'submit' | 'button' | 'reset' | undefined
  disable: boolean
}

const Button = (props: Props) => {
  return (
    <button
      type={props.type}
      disabled={props.disable}
      className={`w-full max-h-[24px] flex cursor-pointer rounded-xl border ${
        props.disable
          ? 'bg-primary-light/50 border-primary-light/30 text-gray-100 shadow-none'
          : 'border-primary-light hover:border-primary-dark bg-primary-light hover:bg-primary-dark text-white shadow-md shadow-primary-light/25 hover:shadow-primary-dark/25 hover:shadow transition-all duration-200 ease-in-out'
      }  py-6 px-24 items-center justify-center font-bold text-sm lg:text-base capitalize`}
    >
      {props.children}
    </button>
  )
}

export default Button
