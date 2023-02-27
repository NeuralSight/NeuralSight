import React from 'react'
import CommingSoon from '../../components/CommingSoon'

type Props = {}

export default function alert({}: Props) {
  return (
    <div className='w-full h-full'>
      <CommingSoon />
    </div>
  )
}
