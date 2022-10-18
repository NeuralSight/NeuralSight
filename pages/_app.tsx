import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  UseErrorBoundary,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient({
    queryCache: new QueryCache({
      //
      onError: (error) => console.log(`Something went wrong: ${error}`),
    }),
  })
  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
