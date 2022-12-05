type Props = {
  inference: string | number
}

const Inference = ({ inference }: Props) => {
  return (
    <div className='flex space-x-2 items-center'>
      <p className='text-lg text-gray-400 font-normal capitalize'>
        Likelihood:
      </p>
      <div
        className={`px-2.5 py-1 rounded-lg font-bold ${
          inference > 0.75
            ? 'bg-red-500/20 text-red-600'
            : inference > 0.5 && inference < 0.75
            ? 'bg-orange-500/20 text-orange-600'
            : 'bg-green-500/20 text-green-600'
        }`}
      >
        {inference > 0.75
          ? 'high'
          : inference > 0.5 && inference < 0.75
          ? 'medium'
          : 'low'}
      </div>
    </div>
  )
}

export default Inference
