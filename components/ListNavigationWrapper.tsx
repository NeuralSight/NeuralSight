import { ReactElement, ReactNode } from 'react'

type Props = {
  topComponent?: ReactElement | undefined
  title?: string | undefined
  children: ReactNode | undefined
}

const ListNavigationWrapper = ({ children, title, topComponent }: Props) => {
  return (
    <div className='w-full h-full mb-8 lg:border-2 lg:border-primary-light lg:rounded-2xl bg-gray-50/95 py-5 flex flex-col space-y-6 '>
      {topComponent && topComponent}
      <div className='flex flex-col space-y-6 '>
        {title && (
          <div className='uppercase text-lg text-center underline underline-offset-2'>
            {title}
          </div>
        )}
        <div className='flex flex-col space-y-3 overflow-y-scrol h-screen max-h-[480px] w-full scrollbar-thin scrollbar-thumb-primary-light scrollbar-track-primary-light/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scroll-smooth'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ListNavigationWrapper
