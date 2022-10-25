import React from 'react'
import { Icon } from '@iconify/react'

type Props = {
  id: string
  idKey: number
  active?: boolean
  handleActive: React.Dispatch<React.SetStateAction<number>>
}

const PatientIdCard = (props: Props) => {
  console.log('active', props.active)
  return (
    <div
      className={`cursor-pointer relative ${
        props.active && 'font-semibold'
      } py-2 px-6 text-center rounded-full hover:bg-primary-light/20`}
      onClick={() => props.handleActive(props.idKey)}
    >
      {props.id}
      <div
        className={`flex bg-primary-dark rounded-tl-xl rounded-bl-xl absolute -right-9 items-center top-1/2 transform -translate-y-1/2 border-l-2 border-t-2 border-b-2 border-primary-light`}
      >
        {props.active ? (
          <Icon
            icon={'eva:arrow-ios-back-outline'}
            className='h-7 w-7 fill-current text-gray-50'
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default PatientIdCard
