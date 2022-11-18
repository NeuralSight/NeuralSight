import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
// src/context/auth-context.js
import { createContext } from 'react'
import { UserInfo, AuthContextType } from '../typings'

const AuthContext = createContext<AuthContextType | null>(null)
// get the provider

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<UserInfo>({
    access_token: '',
  })

  const setUserAuthInfo = (data: UserInfo) => {
    //store in react-cookies instead

    setAuthState(data)
  }

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => !!authState.access_token

  const SampleAuthContext: AuthContextType = {
    authState,
    setAuthState: (userAuthInfo: UserInfo) => setUserAuthInfo(userAuthInfo),
    isUserAuthenticated,
  }
  return (
    <AuthContext.Provider value={SampleAuthContext}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
