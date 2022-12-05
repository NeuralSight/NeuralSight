import { generateKey } from 'crypto'
import React from 'react'
import { generateRandomString } from '../../../helper/randomStringGenerator'
import ResultCard from './ResultCard'

type Props = {}

const ModelResultsObj = {
  patientID: '600d475fa96e305as2eas8c9cqw2b851qs',
  disease: 'TB',
  totalPathogens: 12,
  abnormal: true,
  inference: '0.4',
  src: '#',
  pathogens: [
    {
      key: generateRandomString(128),
      confidence: '0.3',
      category: 'p',
      type: 'pleural Effusion ',
    },
    {
      key: generateRandomString(128),
      confidence: '0.90',
      category: 'p',
      type: 'plumonary fiborisis',
    },
    {
      key: generateRandomString(128),

      confidence: '0.20',
      category: 'p',
      type: 'pleural Thikening',
    },
    {
      key: generateRandomString(128),

      confidence: '0.20',
      category: 'p',
      type: 'Pnumeothorax',
    },
    {
      key: generateRandomString(128),

      type: 'opacity',
      category: 'l',
      confidence: '0.90',
    },
    {
      key: generateRandomString(128),

      type: 'consolidation',
      category: 'l',
      confidence: '0.30',
    },
    {
      key: generateRandomString(128),

      type: 'fibrosis',
      category: 'l',
      confidence: '0.30',
    },
    {
      key: generateRandomString(128),

      type: 'nodule',
      category: 'l',
      confidence: '0.10',
    },
    {
      key: generateRandomString(128),

      type: 'emphysema',
      category: 'l',
      confidence: '0.20',
    },
    {
      key: generateRandomString(128),

      type: 'cavity',
      category: 'l',
      confidence: '0.10',
    },
    {
      key: generateRandomString(128),

      type: 'cardiomegaly',
      category: 'h',
      confidence: '0.90',
    },
    {
      key: generateRandomString(128),

      type: 'raised/tented diaphragm',
      category: 'd',
      confidence: '0.10',
    },
    {
      key: generateRandomString(128),

      type: 'pneumoperitoneum',
      category: 'l',
      confidence: '0.10',
    },
    {
      key: generateRandomString(128),

      type: 'Degenerative Spine condition',
      category: 'b',
      confidence: '0.10',
    },
    {
      key: generateRandomString(128),
      type: 'rib fracture',
      category: 'b',
      confidence: '0.10',
    },
    {
      key: generateRandomString(128),
      type: 'scollosis',
      category: 'l',
      confidence: '0.10',
    },
    {
      key: generateRandomString(128),
      type: 'Blunted Constophrenic Angile',
      category: 'p',
      confidence: '0.90',
    },
    {
      key: generateRandomString(128),
      type: 'tracheal shift',
      category: 'm',
      confidence: '0.10',
    },
    {
      key: generateRandomString(128),
      type: 'hilar prominence',
      category: 'm',
      confidence: '0.10',
    },
  ],
  modality: 'CT scan',
}
const pathogens = ModelResultsObj.pathogens
const lungs = pathogens.filter((item) => item.category.toLowerCase() == 'l')
const pleural = pathogens.filter((item) => item.category.toLowerCase() == 'p')
const heart = pathogens.filter((item) => item.category.toLowerCase() == 'h')
const medi = pathogens.filter((item) => item.category.toLowerCase() == 'm')
const diaphragm = pathogens.filter((item) => item.category.toLowerCase() == 'd')
const bones = pathogens.filter((item) => item.category == 'b')
console.log('lungs', lungs)
const ModelResults = (props: Props) => {
  return (
    <div className='w-full h-fit flex flex-col space-y-1'>
      <div className=''>
        <h4 className='capitalize text-primary-dark/90 text-center font-medium print:underline-offset-4 underline-offset-1 underline decoration-primary-dark/90 text-lg lg:text-xl mb-4'>
          Neural Sight Interpretation
        </h4>
        <div className='report-sub-title'>Result</div>
        <div className='py-2 w-full space-y-1 flex flex-col'>
          <ResultCard
            type={'abnormal'}
            confidence={ModelResultsObj.abnormal ? '1' : '0'}
          />
          <ResultCard
            type={
              ModelResultsObj.disease == 'TB'
                ? 'tuberculosis'
                : ModelResultsObj.disease
            }
            confidence={ModelResultsObj.inference}
          />
          <ResultCard type={'pneumonia'} confidence={'0.90'} />
        </div>
      </div>
      <div>
        <div className='report-sub-title'>Lungs</div>
        <div className='py-2 w-full space-y-1 flex flex-col'>
          {lungs.map((item) => (
            <ResultCard
              key={item.key}
              type={item.type}
              confidence={item.confidence}
            />
          ))}
        </div>
      </div>
      <div>
        <div className='report-sub-title'>Pleural</div>
        <div className='py-2 w-full space-y-1 flex flex-col'>
          {pleural.map((item) => (
            <ResultCard
              key={item.key}
              type={item.type}
              confidence={item.confidence}
            />
          ))}
        </div>
      </div>
      <div>
        <div className='report-sub-title'>Heart</div>
        <div className='py-2 w-full space-y-1 flex flex-col'>
          {heart.map((item) => (
            <ResultCard
              key={item.key}
              type={item.type}
              confidence={item.confidence}
            />
          ))}
        </div>
      </div>
      <div>
        <div className='report-sub-title'>Mediastinum</div>
        <div className='py-2 w-full space-y-1 flex flex-col'>
          {medi.map((item) => (
            <ResultCard
              key={item.key}
              type={item.type}
              confidence={item.confidence}
            />
          ))}
        </div>
      </div>
      <div>
        <div className='report-sub-title'>Diaphragm</div>
        <div className='py-2 w-full space-y-1 flex flex-col'>
          {diaphragm.map((item) => (
            <ResultCard
              key={item.key}
              type={item.type}
              confidence={item.confidence}
            />
          ))}
        </div>
      </div>
      <div>
        <div className='report-sub-title'>Bones</div>
        <div className='py-2 w-full space-y-1 flex flex-col'>
          {bones.map((item) => (
            <ResultCard
              key={item.key}
              type={item.type}
              confidence={item.confidence}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModelResults
