import React, { SetStateAction, Dispatch } from 'react'
import { generateRandomString } from '../../../helper/randomStringGenerator'
import ResultCard from './ResultCard'
import { AnyObject, PatientReportResult } from '../../../typings'

type Props = {
  disease: string
  patientId: string
  selected: boolean
}

const ModelResults = ({ disease, patientId, selected }: Props) => {
  const diseasesPresentObj: AnyObject = {}
  const diseaseArr = disease.split('\n')
  console.log('diseaseArr', diseaseArr)

  //loop through the names
  //   {0: 'Cardiomegaly',
  //  1: 'Pleural effusion',
  //  2: 'Pleural thickening',
  //  3: 'Aortic enlargement',
  //  4: 'Pulmonary fibrosis',
  //  5: 'ILD',
  //  6: 'Nodule/Mass',
  //  7: 'Other lesion',
  //  8: 'Lung Opacity',
  //  9: 'Infiltration',
  //  10: 'Consolidation',
  //  11: 'Calcification',
  //  12: 'Atelectasis',
  //  13: 'Pneumothorax'}
  const ModelResultsObj = {
    patientID: patientId,
    disease: 'TB',
    totalPathogens: 13,
    abnormal: diseaseArr.length > 0,
    inference: '0.4',
    src: '#',
    pathogens: [
      {
        key: generateRandomString(128),
        confidence: '0.00',
        category: 'p',
        type: 'pleural Effusion',
        name: 'Pleural effusion',
      },
      {
        key: generateRandomString(128),
        confidence: '0.00',
        category: 'p',
        name: 'Pulmonary fibrosis',
        type: 'plumonary fiborisis',
      },
      {
        key: generateRandomString(128),

        confidence: '0.00',
        category: 'p',
        name: 'Pleural thickening',
        type: 'pleural Thikening',
      },
      {
        key: generateRandomString(128),

        confidence: '0.00',
        category: 'p',
        type: 'Pneumothorax',
        name: 'Pneumothorax',
      },
      {
        key: generateRandomString(128),

        type: 'lungs opacity',
        name: 'Lung Opacity',
        category: 'l',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),

        type: 'consolidation',
        category: 'l',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),

        type: 'fibrosis',
        category: 'l',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),

        type: 'Nodule/Mass',
        name: 'Nodule/Mass',
        category: 'l',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),

        type: 'emphysema',
        category: 'l',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),

        type: 'cavity',
        category: 'l',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),

        type: 'cardiomegaly',
        category: 'h',
        name: 'Cardiomegaly',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),

        type: 'raised/tented diaphragm',
        category: 'd',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),

        type: 'pneumoperitoneum',
        category: 'l',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),

        type: 'Degenerative Spine condition',
        category: 'b',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),
        type: 'rib fracture',
        category: 'b',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),
        type: 'aortic enlargement',
        category: 'h',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),
        type: 'scollosis',
        category: 'l',
        confidence: '0.00',
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
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),
        type: 'hilar prominence',
        category: 'm',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),
        type: 'Interstitial lung disease (ILD)',
        name: 'ILD',
        category: 'l',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),
        type: 'Other lesion',
        name: 'Other lesion',
        category: 'o',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),
        type: 'pulmonary infiltration',
        name: 'Infiltration',
        category: 'l',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),
        type: 'Consolidation',
        name: 'Consolidation',
        category: 'p',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),
        type: 'Atelectasis',
        name: 'Atelectasis',
        category: 'l',
        confidence: '0.00',
      },
      {
        key: generateRandomString(128),
        type: 'Calcification',
        name: 'Calcification',
        category: 'o',
        confidence: '0.00',
      },
    ],
    modality: 'CT scan',
  }

  for (let i = 0; i < diseaseArr.length; i++) {
    const disArr: string[] = diseaseArr[i].split(' ')
    console.log(disArr)
    diseasesPresentObj[disArr[0]] = disArr[1]
    for (let pathogen of ModelResultsObj.pathogens) {
      if (pathogen.name) {
        if (
          pathogen.name.toLocaleLowerCase() == disArr[0].toLocaleLowerCase()
        ) {
          // equal to the confidence put up by the model
          pathogen.confidence = disArr[1]
        }
      }
    }
  }
  console.log('diseasePresentObj', diseasesPresentObj)
  const pathogens = ModelResultsObj.pathogens
  const lungs = pathogens.filter((item) => item.category.toLowerCase() == 'l')
  const pleural = pathogens.filter((item) => item.category.toLowerCase() == 'p')
  const heart = pathogens.filter((item) => item.category.toLowerCase() == 'h')
  const medi = pathogens.filter((item) => item.category.toLowerCase() == 'm')
  const diaphragm = pathogens.filter(
    (item) => item.category.toLowerCase() == 'd'
  )
  const bones = pathogens.filter((item) => item.category == 'b')
  const others = pathogens.filter((item) => item.category == 'o')
  console.log('lungs', lungs)
  console.log('disease', disease)

  return (
    <div className='w-full h-fit flex flex-col space-y-1 pb-10'>
      <div className=''>
        <h4 className='capitalize text-primary-dark/90 text-center font-medium print:underline-offset-4 underline-offset-1 underline decoration-primary-dark/90 text-lg lg:text-xl mb-4'>
          Neural Sight Interpretation of the{' '}
          {ModelResultsObj.totalPathogens || ModelResultsObj.pathogens.length}{' '}
          Pathologies
        </h4>
        <div className='report-sub-title'>Result</div>
        <div className='py-2 w-full space-y-1 flex flex-col'>
          <ResultCard
            type={'abnormal'}
            showPercentage={selected}
            confidence={ModelResultsObj.abnormal ? '1' : '0'}
          />
          <ResultCard
            showPercentage={selected}
            type={
              ModelResultsObj.disease == 'TB'
                ? 'tuberculosis'
                : ModelResultsObj.disease
            }
            confidence={ModelResultsObj.inference}
          />
          <ResultCard
            type={'pneumonia'}
            confidence={'0.90'}
            showPercentage={selected}
          />
        </div>
      </div>
      <div>
        <div className='report-sub-title'>Lungs</div>
        <div className='py-2 w-full space-y-1 flex flex-col'>
          {lungs.map((item) => (
            <ResultCard
              showPercentage={selected}
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
              showPercentage={selected}
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
              showPercentage={selected}
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
              showPercentage={selected}
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
              showPercentage={selected}
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
              showPercentage={selected}
              key={item.key}
              type={item.type}
              confidence={item.confidence}
            />
          ))}
        </div>
      </div>
      <div>
        <div className='report-sub-title'>Others</div>
        <div className='py-2 w-full space-y-1 flex flex-col'>
          {others.map((item) => (
            <ResultCard
              showPercentage={selected}
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
