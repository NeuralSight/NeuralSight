import React, { ReactNode } from 'react'

type Props = {
  target: string
  children: ReactNode // tooltip content
}
/**
 *
 * @param {string} props.target string value of the parent component of the tooltip
 * @param {string} props.children jsx or string of it's the tooltip content
 * @returns Jsx
 */
const ToolTip = ({ target, children }: Props) => {
  return (
    <div
      id={target}
      role='tooltip'
      className='inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700'
    >
      {children}
      <div className='tooltip-arrow' data-popper-arrow></div>
    </div>
  )
}

export default ToolTip
