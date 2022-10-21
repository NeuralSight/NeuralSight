import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import {
  Hydrate,
  QueryClientProvider,
  QueryClient,
  QueryCache,
  UseErrorBoundary,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          //
          onError: (error) => console.log(`Something went wrong: ${error}`),
        }),
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Hydrate state={pageProps.dehydratedState}> */}
      <Component {...pageProps} />
      {/* </Hydrate> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
