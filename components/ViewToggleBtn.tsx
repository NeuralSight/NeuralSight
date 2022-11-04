import { Icon } from '@iconify/react'
import React from 'react'

type Props = {
  isListView: boolean
  setIsListView: React.Dispatch<React.SetStateAction<boolean>>
}

const ViewToggleBtn = (props: Props) => {
  return (
    <div className='flex justify-center items-center space-x-1'>
      <button
        title='grid view'
        aria-label='grid view'
        onClick={() => props.setIsListView(false)}
        className='flex justify-center items-center p-1 hover:bg-primary-light/20 rounded transition-all duration-200 ease-in-out'
      >
        <Icon
          icon='carbon:grid'
          className={`h-8 w-8 fill-current stroke-[3px] ${
            !props.isListView ? 'text-primary-light' : 'text-gray-600'
          }`}
        />
      </button>
      <button
        title={'listview'}
        aria-label={'list view'}
        onClick={() => props.setIsListView(true)}
        className='flex justify-center items-center p-1 hover:bg-primary-light/20 rounded transition-all duration-200 ease-in-out'
      >
        <Icon
          icon='bi:list-task'
          className={`h-8 w-8 fill-current stroke-[3px]  ${
            props.isListView ? 'text-primary-light' : 'text-gray-600'
          }`}
        />
      </button>
    </div>
  )
}

export default ViewToggleBtn
