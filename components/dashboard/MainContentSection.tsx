import { Icon } from '@iconify/react'
import React from 'react'
import DiseaseTypeSelection from '../DiseaseTypeSelection'
import NeuralLabsTextLogo from '../NeuralLabsTextLogo'
import ViewToggleBtn from '../ViewToggleBtn'

type Props = {}

const MainContentSection = (props: Props) => {
  // toggle state between listView and grid
  const [isListView, setIsListView] = React.useState<boolean>(false)
  // set DiseaseType
  const [diseaseType, setDiseaseType] = React.useState<string>()

  return (
    <div className='w-full h-full flex flex-col gap-8'>
      <nav className='px-4 py-2 w-full h-fit bg-gray-50/95 rounded-2xl flex justify-between border-2 border-primary-light'>
        <ViewToggleBtn isListView={isListView} setIsListView={setIsListView} />
        <NeuralLabsTextLogo />
        <DiseaseTypeSelection
          selectedDisease={diseaseType}
          setDiseaseType={setDiseaseType}
        />
      </nav>
      <section className='h-full w-full px-4 py-3 bg-gray-50/95 rounded-2xl border-2 border-primary-light'>
        <div className='h-full w-full flex flex-col'>
          <div className='px-4 py-2 w-full h-fit flex justify-between'>
            <div className='flex w-fit space-x-3'>
              {/* right side */}
              <div className={`chip active`}>
                <Icon icon='akar-icons:image' className='h-6 w-6 mr-1' />
                {'  X-ray'}
              </div>
              <div className={`chip`}>
                <Icon icon='akar-icons:image' className='h-6 w-6 mr-1' />
                {'  MRI'}
              </div>
            </div>
            <div className='flex w-fit space-x-3'>
              {/* left side */}
              <button
                type='button'
                className='flex justify-center items-center w-fit rounded-2xl border-2 border-dashed border-primary-light bg-transparent text-gray-900 font-medium py-2 px-4 hover:bg-primary-lightest'
              >
                <Icon
                  icon={'material-symbols:sort-rounded'}
                  className='h-6 w-6 fill-current text-primary-light mr-1 stroke-[3px]'
                />
                {'filters'}
                {/* filter btn */}
              </button>
              <button
                type='button'
                className='b p-2 flex items-center justify-center bg-zinc-300/80 rounded-full hover:bg-red-500/30 active:bg-red-500/30'
                arial-label='delete patient image button '
              >
                {/* delete button will prompt the user if sure he want to delete in a small modal*/}
                <Icon
                  icon='fluent:delete-16-regular'
                  className='h-6 w-6 fill-current text-zinc-800'
                />
              </button>
            </div>
          </div>
          {/* grid  */}
          <div className='grid grid-cols-3'>
            {/* Here will contain add button and image cards */}
          </div>
          {/* list */}
        </div>
      </section>
    </div>
  )
}

export default MainContentSection
