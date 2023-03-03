import { QueryKey, useQuery } from '@tanstack/react-query'
import useLogout from './use-logout'
const useAuthedQuery = (
  queryName: QueryKey,
  queryFunction: () => any,
  ...options: any
) => {
  const query = useQuery(queryName, queryFunction, options)
  // console.log('query', query)
  const error: any = query?.error
  // console.log('error', error)

  if (error?.status === 401 || error?.status === 403) {
    // Insert custom access-token refresh logic here. For now, we are
    // remove tokens from local storage
    // just refreshing the page here, so as to redirect them to the
    // login page since their token is now expired
  }
  return query
}

export default useAuthedQuery
