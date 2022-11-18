import '../styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { useState } from 'react'
import {
  Hydrate,
  QueryClientProvider,
  QueryClient,
  QueryCache,
  UseErrorBoundary,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from '../context/auth-context'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
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
      <AuthProvider>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          ></meta>
        </Head>
        {/* <Hydrate state={pageProps.dehydratedState}> */}
        <Component {...pageProps} />
        {/* </Hydrate> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
