import NeuralLabsTextLogo from './NeuralLabsTextLogo'
import Profile from './Profile'

type Props = {}

const SmallDeviceNavBar = (props: Props) => {
  return (
    <nav className='h-fit w-full flex justify-between bg-slate-50 items-center px-2 py-2 border-b-2 border-primary-light'>
      <NeuralLabsTextLogo />
      <Profile />
    </nav>
  )
}

export default SmallDeviceNavBar
