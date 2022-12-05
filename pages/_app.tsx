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
  QueryErrorResetBoundary,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from '../context/auth-context'
import { ErrorBoundary } from 'react-error-boundary'
import Button from '../components/Button'

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
    // error boundary
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          // reset the state of your app so the error doesn't happen again
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div className='w-full h-full flex flex-col items-center justify-center space-y-6'>
              <div className='text-black text-xl capitalize'>
                There was an error!
              </div>
              <div className='text-red-500 font-medium italic '>
                {process.env.NODE_ENV !== 'production' && error.message}
              </div>
              <Button onClick={() => resetErrorBoundary()}>Try again</Button>
            </div>
          )}
        >
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
              {process.env.NODE_ENV == 'production' || (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </AuthProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export default MyApp
