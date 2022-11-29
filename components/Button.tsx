import React from 'react'

type Props = {
  children: React.ReactNode
  outlined?: boolean | undefined
  type?: 'submit' | 'button' | 'reset' | undefined
  disable?: boolean
  hSize?: 'py-6' | 'py-5' | 'py-4' | 'py-3'
  wSize?: 'px-6' | 'px-4' | 'px-3'
  textSize?: 'text-sm' | 'text-md' | 'text-lg' | string | undefined
  textBold?: 'font-bold' | 'font-semibold' | 'font-medium' | 'font-normal'
  onClick?: () => void
}

const Button = ({
  children,
  type,
  disable,
  outlined,
  wSize = 'px-4',
  hSize = 'py-6',
  onClick,
  textBold = 'font-bold',
  textSize = 'text-sm',
}: Props) => {
  return (
    <button
      type={type}
      disabled={disable}
      className={`w-full max-h-[24px] flex items-center justify-center cursor-pointer rounded-xl fill-current border-2 ${
        disable
          ? 'bg-primary-light/50 border-primary-light/10 text-gray-100 shadow-none'
          : `   border-primary-light hover:border-secondary-dark ${
              outlined
                ? 'bg-transparent text-primary-light'
                : 'shadow-md  shadow-primary-light/25 hover:shadow-primary-dark/25 bg-primary-light text-white'
            } hover:bg-secondary-dark hover:text-white  hover:shadow transition-all duration-200 ease-in-out`
      } ${wSize} ${hSize} ${textBold} ${textSize} lg:text-base capitalize`}
      onClick={type == 'submit' ? undefined : onClick}
    >
      {children}
    </button>
  )
}

export default Button
