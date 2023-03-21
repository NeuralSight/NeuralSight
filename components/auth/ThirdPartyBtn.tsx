import React from 'react'

type Props = {
  children: React.ReactNode | string | undefined
  type: 'button' | 'submit' | 'reset' | undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}
const ThirdPartyBtn = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className='flex w-full cursor-pointer max-h-6 py-6 px-20 rounded-xl bg-transparent border border-gray-500/50 text-sm lg:text-base font-medium text-zinc-500 justify-center items-center hover:bg-gray-400/10 transition-all duration-200 ease-in-out group outline-none hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-gray-500/50'
    >
      {props.children}
    </button>
  )
}

export default ThirdPartyBtn
