import { Icon } from '@iconify/react'
import React from 'react'

const NeuralLabsTextLogo = () => {
  return (
    <div className='flex  items-center'>
      <h2
        style={{ fontFamily: 'Oswald' }}
        className='font-medium text-base xl:text-xl tracking-widest uppercase text-primary-dark my-auto align-middle text-centez flex'
      >
        Neural Sight{' '}
      </h2>
      <Icon icon={'emojione:eye-in-speech-bubble'} className='h-8 w-8 ml-2' />
    </div>
  )
}

export default NeuralLabsTextLogo
