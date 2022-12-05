import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const MainSectionNavBar = ({ children }: Props) => {
  return (
    <nav className='print:hidden px-4 py-2 w-full h-fit bg-gray-50/95 lg:rounded-2xl flex justify-between lg:border-2 border-primary-light items-center'>
      {children}
    </nav>
  )
}

export default MainSectionNavBar
