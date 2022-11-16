import Link from 'next/link'

type Props = {
  link: string
  name: string
}

const Contact = ({ link, name }: Props) => {
  return (
    <Link href={link}>
      <li className='py-1 px-6 rounded-lg w-full hover:underline active:underline active:decoration-slate-50  text-white lg:text-primary-dark text-medium lg:hover:bg-primary-lightest'>
        {name}
      </li>
    </Link>
  )
}

export default Contact
