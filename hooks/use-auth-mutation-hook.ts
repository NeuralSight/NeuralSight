import { useMutation } from '@tanstack/react-query'

const useAuthedMutation = (
  mutationFn: () => Promise<Response>,
  callbacksFnObj: object
) => {
  const mutation = useMutation(mutationFn, callbacksFnObj)
  const response = mutation?.data
  if (response?.status === 401 || response?.status === 403) {
    // Insert custom access-token refresh logic here. For now, we are
    // just refreshing the page here, so as to redirect them to the
    // login page since their token is now expired.
    // remove user token and redirect them to login
  }
  return mutation
}

export default useAuthedMutation
