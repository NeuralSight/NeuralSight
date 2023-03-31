import '../styles/globals.css'
import '../styles/loading.css'
import '../styles/loadingTwo.css'
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
import { ErrorBoundary } from 'react-error-boundary'
import { PatientProvider } from '../context/patient-context'
import { ReportProvider } from '../context/report-context'
import { UserProvider } from '../context/user-context'
import ErrorMessagePage from '../components/ErrorMessagePage'

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
            <ErrorMessagePage
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <QueryClientProvider client={queryClient}>
            <UserProvider>
              <PatientProvider>
                <ReportProvider>
                  <Head>
                    <meta
                      name='viewport'
                      content='width=device-width, initial-scale=1.0'
                    ></meta>
                  </Head>
                  <Hydrate state={pageProps.dehydratedState}>
                    <Component {...pageProps} />
                  </Hydrate>
                  {process.env.NODE_ENV == 'production' || (
                    <ReactQueryDevtools initialIsOpen={false} />
                  )}
                </ReportProvider>
              </PatientProvider>
            </UserProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export default MyApp
