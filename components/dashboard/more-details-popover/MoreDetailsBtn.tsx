import React from 'react'

type Props = {
  children: React.ReactNode
  link?: string
  handleDelete?: () => void
}

const MoreDetailsBtn = (props: Props) => {
  return (
    <a
      href={props.link}
      className={`text-sm rounded-md cursor-pointer py-2 px-4 font-normal hover:font-medium block w-full whitespace-nowrap bg-transparent  capitalize ${
        props.children == 'delete'
          ? 'text-red-600 hover:bg-red-500/20'
          : 'text-slate-700 hover:bg-slate-300/50'
      }`}
      onClick={props.handleDelete}
      // onClick={(e) => e.preventDefault()}
    >
      {props.children}
    </a>
  )
}

export default MoreDetailsBtn
