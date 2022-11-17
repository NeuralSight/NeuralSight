import Link from 'next/link'

type Props = {
  link: string
  name: string
}

const Contact = ({ link, name }: Props) => {
  return (
    <Link href={link}>
      <li className='py-1 px-3 xl:px-6 rounded-lg w-full hover:underline active:underline active:decoration-slate-50  text-white xl:text-primary-dark text-sm xl:text-base text-medium xl:hover:bg-primary-lightest text-center xl:text-left'>
        {name}
      </li>
    </Link>
  )
}

export default Contact
