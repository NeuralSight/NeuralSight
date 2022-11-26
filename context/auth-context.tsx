import Cookies from 'js-cookie'
import { ReactNode, useState } from 'react'
import { createContext } from 'react'
import { UserInfo, AuthContextType } from '../typings'

const AuthContext = createContext<AuthContextType | null>(null)
// get the provider

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<string | null | undefined>(undefined)
  const [isRemembered, setIsRemembered] = useState<boolean>(false)

  // set user auth info
  const setUserAuthInfo = async (data: UserInfo) => {
    // set user to state
    setUser(data.access_token)
    //store in react-cookies of access later instead
    const response = await fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data.access_token, remember: isRemembered }),
    })
    console.log('status', await response.json())
  }

  // get user authication info
  const getUserAuthInfo = async () => {
    // send a request to read the cookie in the headers
    const response = await fetch('/api/is-loggedIn')
    const data = await response.json()
    setUser(data)
  }
  console.log('user', user)
  // checks if the user is authenticated or not
  const isUserAuthenticated = () => !!user

  const SampleAuthContext: AuthContextType = {
    authState: user,
    setAuthState: (userAuthInfo: UserInfo) => setUserAuthInfo(userAuthInfo),
    setIsRemembered: setIsRemembered,
    isUserAuthenticated,
    getAuthState: () => getUserAuthInfo(),
  }
  return (
    <AuthContext.Provider value={SampleAuthContext}>
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.getServerSideProps = () => {}
export { AuthContext, AuthProvider }
