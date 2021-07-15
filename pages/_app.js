import { SWRConfig } from "swr";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.log(err);
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
