import '../styles/globals.css'
import { NextPage } from 'next'
import { MainLayout } from '../src/components/common/layout/MainLayout'
import type { AppProps } from 'next/app'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => JSX.Element
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>)

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
