import { SWRConfig } from 'swr'

import fetcher from '@/lib/fetchJSON'
import '@/styles/global.css'

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        onError: (err) => {
          console.log(err)
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}
