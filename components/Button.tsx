import React from 'react'

type Props = {
  children: React.ReactNode
  outlined?: boolean | undefined
  type?: 'submit' | 'button' | 'reset' | undefined
  disable?: boolean
}

const Button = (props: Props) => {
  return (
    <button
      type={props.type}
      disabled={props.disable}
      className={`w-full max-h-[24px] flex items-center justify-center cursor-pointer rounded-xl  fill-current ${
        props.disable
          ? 'bg-primary-light/50 border-primary-light/30 text-gray-100 shadow-none'
          : `  ${
              props.outlined ? 'border-2' : 'border'
            } border-primary-light hover:border-primary-dark ${
              props.outlined
                ? 'bg-transparent text-primary-light'
                : 'bg-primary-light text-white'
            } hover:bg-primary-dark hover:text-white shadow-md shadow-primary-light/25 hover:shadow-primary-dark/25 hover:shadow transition-all duration-200 ease-in-out`
      }  py-6 font-bold text-sm lg:text-base capitalize`}
    >
      {props.children}
    </button>
  )
}

export default Button
