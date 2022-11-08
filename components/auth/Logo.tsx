import React from 'react'
import Image from 'next/image'
import Gif_Logo from '../../public/images/Gif_Logo.gif'

type Props = {}

const Logo = (props: Props) => {
  return (
    <Image
      src={Gif_Logo}
      alt='Neural Labs'
      className=''
      style={{ width: 'auto', height: '40px' }}
    />
  )
}

export default Logo
