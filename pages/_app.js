import { SWRConfig } from "swr";
import fetcher from "../lib/fetchJSON";
import "../styles/global.css";

// +1hr...https://stackoverflow.com/questions/57609931/next-js-with-fortawesome-and-ssr
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        onError: (err) => {
          console.log(err);
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
