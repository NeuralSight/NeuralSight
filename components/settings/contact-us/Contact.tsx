import Link from 'next/link'

type Props = {
  link: string
  name: string
}

const Contact = ({ link, name }: Props) => {
  return (
    <Link href={link}>
      <li className='py-1 px-6 rounded-lg w-full hover:underline text-primary-dark text-medium hover:bg-primary-lightest'>
        {name}
      </li>
    </Link>
  )
}

export default Contact
