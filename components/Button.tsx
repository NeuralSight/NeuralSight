import React from 'react'

type Props = {
  color: string
  children: React.ReactNode | string
  outlined: false | boolean | undefined
  type: 'submit' | 'button' | 'reset' | undefined
}

const Button = (props: Props) => {
  return (
    <button
      type={props.type}
      className={`w-full max-h-[24px] flex cursor-pointer  rounded-xl border border-primary-light hover:border-primary-dark hover:bg-primary-dark py-6 px-24 items-center justify-center transition-all duration-200 ease-in-out shadow-lg shadow-black hover:shadow`}
    >
      {props.children}
    </button>
  )
}

export default Button
