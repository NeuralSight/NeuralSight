import Cookies from 'js-cookie'
import { ReactNode } from 'react'
import { createContext } from 'react'
import { UserInfo, AuthContextType } from '../typings'

const AuthContext = createContext<AuthContextType | null>(null)
// get the provider

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const OneWeekInMillSec = 604800000
  //cookie expiry date
  const expiryDate = new Date(Date.now() + OneWeekInMillSec)

  const setUserAuthInfo = async (data: UserInfo) => {
    //store in react-cookies of access later instead
    // req to set cookie in the backend
    const response = await fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data.access_token }),
    })
    console.log('status', await response.json())
    // if one logs in without setting remember me to true remember me the the cookies will be store for also log as the session is on the destroyed otherwise it will be store with a time limit of 1 week
  }

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => !!Cookies.get('user')

  const SampleAuthContext: AuthContextType = {
    authState: Cookies.get('user'),
    setAuthState: (userAuthInfo: UserInfo) => setUserAuthInfo(userAuthInfo),
    isUserAuthenticated,
  }
  return (
    <AuthContext.Provider value={SampleAuthContext}>
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.getServerSideProps = () => {}
export { AuthContext, AuthProvider }
