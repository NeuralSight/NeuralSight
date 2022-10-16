import React from 'react'

type Props = {
  children: React.ReactNode | string | undefined
  type: 'button' | 'submit' | 'reset' | undefined
}

const ThirdPartyBtn = (props: Props) => {
  return (
    <button
      type={props.type}
      className='flex  cursor-pointer w-auto max-h-6 py-6 px-20 rounded-xl bg-transparent border-[2px] border-zinc-500/50 text-sm lg:text-base font-medium text-zinc-500 justify-center items-center hover:bg-slate-400/10 transition-all duration-200 ease-in-out group'
    >
      {props.children}
    </button>
  )
}

export default ThirdPartyBtn
