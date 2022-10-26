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
      <nav className='px-4 py-2 w-full h-fit bg-gray-50/95 rounded-2xl flex justify-between'>
        <ViewToggleBtn isListView={isListView} setIsListView={setIsListView} />
        <NeuralLabsTextLogo />
        <DiseaseTypeSelection
          selectedDisease={diseaseType}
          setDiseaseType={setDiseaseType}
        />
      </nav>
      <section className='h-full w-full px-6 py-3 bg-gray-50/95 rounded-2xl'>
        <div className='h-full w-full flex flex-col'>
          <div className='px-4 py-2 w-full h-fit flex justify-between'>
            <div className='flex w-fit space-x-1'>{/* right side */}</div>
            <div className='flex w-fit space-x-1'>{/* left side */}</div>
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
