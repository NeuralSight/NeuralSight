import { ReactNode, createContext } from 'react'
import { User, UserContextType, UserError } from '../typings'
import { useQuery } from '@tanstack/react-query'
import { fetchUserInfo } from '../utils/config'

type Props = {
  children: ReactNode
}

const UserContext = createContext<UserContextType | null>(null)

const UserProvider = ({ children }: Props) => {
  const { data, isLoading, isSuccess, isError } = useQuery(
    ['user'],
    async () => (await fetchUserInfo()) as User
  )
  const getUserInfo = () => {
    if (data?.detail) {
      return
    }
    return data
  }
  const sampleUserContext: UserContextType = {
    getUserInfo,
    isError: () => isError,
    isLoading: () => isLoading,
    isSuccess: () => isSuccess,
  }
  return (
    <UserContext.Provider value={sampleUserContext}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
