import React from 'react'

type Props = {
  children: React.ReactNode
  link: string
}

const MoreDetailsBtn = (props: Props) => {
  return (
    <a
      href={props.link}
      className={
        'text-sm rounded-md hover:bg-slate-300/50 py-2 px-4 font-normal hover:font-medium block w-full whitespace-nowrap bg-transparent text-slate-700 '
      }
      // onClick={(e) => e.preventDefault()}
    >
      {props.children}
    </a>
  )
}

export default MoreDetailsBtn
