import { Icon } from '@iconify/react'

type Props = {
  key: number
  text: string
  icon: string
  link: string
}

const MenuCard = ({ icon, text }: Props) => {
  return (
    <div className='rounded-md flex w-full items-center space-x-1 text-slate-800 hover:text-slate-900 text-cnter px-2 py-2 active:bg-zinc-500/50'>
      <Icon icon={icon} className='h-4 w-4 fill-current' />
      <p className='text-sm'>{text}</p>
    </div>
  )
}

export default MenuCard