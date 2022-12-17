import { Icon } from '@iconify/react'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import ThirdPartyBtn from '../auth/ThirdPartyBtn'
import ListNavigationCard from '../ListNavigationCard'
import ListNavigationWrapper from '../ListNavigationWrapper'

const SETTINGS_OPTION = [
  {
    id: '1',
    btnName: 'Edit profile',
    icon: 'eva:edit-2-fill',
  },
  {
    id: '2',
    btnName: 'Security & Password',
    icon: 'ic:outline-security',
  },
]

type Props = {
  active: string
  setActive: Dispatch<SetStateAction<string>>
}

const SettingOptionSection = (props: Props) => {
  return (
    <ListNavigationWrapper
      topComponent={
        <div className='flex flex-col space-y-6 px-12 lg:px-3'>
          <Link href='/'>
            <ThirdPartyBtn type='button'>
              <Icon
                icon='eva:arrow-ios-back-fill'
                className='h-6 w-6 fill-current'
              />{' '}
              Go Back Home
            </ThirdPartyBtn>
          </Link>
        </div>
      }
    >
      {SETTINGS_OPTION.map((item) => (
        <ListNavigationCard
          idKey={item.id}
          setActive={props.setActive}
          key={item.id}
          active={item.id === props.active}
          className={`font-medium ${
            props.active === item.id ? 'text-zinc-800' : 'text-zinc-500'
          }`}
        >
          <Icon
            icon={item.icon}
            className={`h-6 w-6 fill-current mr-1 ${
              props.active === item.id && 'text-primary-light'
            }`}
          />
          <p>{item.btnName}</p>
        </ListNavigationCard>
      ))}
    </ListNavigationWrapper>
  )
}

export default SettingOptionSection
