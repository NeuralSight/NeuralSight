import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useState } from 'react'
import ThirdPartyBtn from '../auth/ThirdPartyBtn'
import ListNavigationCard from '../ListNavigationCard'
import ListNavigationWrapper from '../ListNavigationWrapper'

type Props = {}

const SETTINGS_OPTION = [
  {
    btnName: 'Edit profile',
    icon: 'eva:edit-2-fill',
  },
  {
    btnName: 'Security & Password',
    icon: 'ic:outline-security',
  },
]

const SettingOptionSection = (props: Props) => {
  const [active, setActive] = useState<number>(0)
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
      {SETTINGS_OPTION.map((item, key) => (
        <ListNavigationCard
          idKey={key}
          setActive={setActive}
          key={key}
          active={key === active}
          className={`font-medium ${
            active === key ? 'text-zinc-800' : 'text-zinc-500'
          }`}
        >
          <Icon
            icon={item.icon}
            className={`h-6 w-6 fill-current mr-1 ${
              active === key && 'text-primary-light'
            }`}
          />
          <p>{item.btnName}</p>
        </ListNavigationCard>
      ))}
    </ListNavigationWrapper>
  )
}

export default SettingOptionSection
