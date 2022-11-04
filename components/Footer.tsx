import React from 'react'
import Link from 'next/link'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className=' flex w-full space-x-2 justify-center items-center'>
      <p className='resetFooter '>&#169; Neurallabs Africa</p>
      <div className='dot'></div>
      <Link href={'#'}>
        <p className='resetFooter cursor-pointer hover:text-slate-900'>
          Contact us
        </p>
      </Link>
      <div className='dot' />
      <Link href={'#'}>
        <p className='resetFooter cursor-pointer hover:text-slate-900'>
          Terms & privacy
        </p>
      </Link>
    </footer>
  )
}

export default Footer
