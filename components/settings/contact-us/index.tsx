import Contact from './Contact'

const HelpLinks = [
  {
    link: '/contact-us',
    name: 'Contact us',
  },
  {
    link: '/about-us',
    name: 'About us',
  },
  {
    link: '/open-live-chat',
    name: 'Help ?',
  },
  {
    link: '/contact-us#FAQs',
    name: 'FAQs',
  },
]
type Props = {}

const ContactUs = (props: Props) => {
  return (
    <ul className='bg-gray-50 rounded-md border-b-[6px] border-t-[3px] border-r-[3px] border-l-[3px] border-zinc-400 py-3  flex flex-col space-y-1 list-none'>
      {HelpLinks.map((item, key) => (
        <Contact {...item} key={key} />
      ))}
    </ul>
  )
}

export default ContactUs
