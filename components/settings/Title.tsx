import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Title = (props: Props) => {
  return (
    <h3
      className='capitalize text-white text-xl lg:text-2xl xl:text-3xl pt-4 tracking-wide '
      style={{ fontFamily: 'Oswald' }}
    >
      {props.children}
    </h3>
  )
}

export default Title
