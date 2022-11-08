import { Icon } from '@iconify/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  idKey: number
  active?: boolean
  setActive: React.Dispatch<React.SetStateAction<number>>
  className?: string | undefined
}

const ListNavigationCard = (props: Props) => {
  return (
    <div
      className={`cursor-pointer relative  `}
      onClick={() => props.setActive(props.idKey)}
    >
      <div
        className={`${props.className} text-sm 2xl:text-base flex items-center mx-[26px] py-2 px-6 text-center rounded-full hover:bg-primary-light/20`}
      >
        {props.children}
      </div>
      {props.active ? (
        <div
          className={`flex bg-primary-dark rounded-tl-xl rounded-bl-xl absolute -left-1 items-center top-1/2 transform rotate-180 -translate-y-1/2 border-l-2 border-t-2 border-b-2 border-primary-light`}
        >
          <Icon
            icon={'eva:arrow-ios-back-outline'}
            className='h-7 w-7 fill-current text-gray-50'
          />
        </div>
      ) : null}
    </div>
  )
}

export default ListNavigationCard
