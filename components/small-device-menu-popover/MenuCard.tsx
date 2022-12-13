import { Icon } from '@iconify/react'
import Link from 'next/link'

type Props = {
  text: string
  icon: string
  link?: string
  isClicked?: boolean
}

const MenuCard = ({ icon, text, link, isClicked = false }: Props) => {
  return (
    <Link href={link || ''}>
      <div className='rounded-md flex w-full items-center space-x-1 text-slate-800 hover:text-slate-900 text-center hover:bg-gray-200 px-2 py-2 active:bg-zinc-500/50'>
        <Icon
          icon={icon}
          className={`h-4 w-4 fill-current ${isClicked && 'animate-bounceX'}`}
        />
        <p className='text-sm'>{text}</p>
      </div>
    </Link>
  )
}

export default MenuCard
