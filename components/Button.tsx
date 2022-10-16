import React from 'react'

type Props = {
  children: React.ReactNode
  outlined: boolean | undefined
  type: 'submit' | 'button' | 'reset' | undefined
}

const Button = (props: Props) => {
  return (
    <button
      type={props.type}
      className={`w-full max-h-[24px] flex cursor-pointer rounded-xl border border-primary-light hover:border-primary-dark bg-primary-light hover:bg-primary-dark py-6 px-24 items-center justify-center transition-all duration-200 ease-in-out shadow-md shadow-primary-light/25 hover:shadow-primary-dark/25 hover:shadow text-white font-bold text-sm lg:text-base capitalize`}
    >
      {props.children}
    </button>
  )
}

export default Button
