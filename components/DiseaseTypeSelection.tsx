import React from 'react'

type Props = {
  selectedDisease: string | undefined
  setDiseaseType: React.Dispatch<React.SetStateAction<string | undefined>>
}
const DiseaseType = ['select a disease', 'TB/pneumonia', 'Covid']

const DiseaseTypeSelection = ({ selectedDisease, setDiseaseType }: Props) => {
  return (
    <div className='w-fit my-auto'>
      <select
        value={selectedDisease}
        onChange={({ target }) => setDiseaseType(target.value)}
        className='bg-gray-50/20 border-2 border-gray-300 text-gray-900 font-medium text-sm rounded-md focus:ring-primary-light focus:border-primary-light p-1.5 placeholder-gray-400 '
      >
        {DiseaseType.map((item, key) => (
          <option key={key} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DiseaseTypeSelection
