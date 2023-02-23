import { Icon } from '@iconify/react'
import React from 'react'
import { getStorageItem, setStorageItem } from '../helper/localStorageAccess'

type Props = {
  isListView: boolean
  setIsListView: React.Dispatch<React.SetStateAction<boolean>>
}

const ViewToggleBtn = (props: Props) => {
  const handleGridView = () => {
    setStorageItem('ListView', false)
    props.setIsListView(false)
  }
  const handleListView = () => {
    setStorageItem('ListView', true)
    props.setIsListView(true)
  }
  return (
    <div className='flex justify-center items-center space-x-1'>
      <button
        title='grid view'
        aria-label='grid view'
        onClick={handleGridView}
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
        onClick={handleListView}
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
