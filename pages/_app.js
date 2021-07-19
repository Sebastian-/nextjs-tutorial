import { SWRConfig } from "swr";
import fetcher from "../lib/fetchJSON";
import { useCreateStore, Provider } from "../lib/store";
import "../styles/global.css";

// +1hr...https://stackoverflow.com/questions/57609931/next-js-with-fortawesome-and-ssr
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const createStore = useCreateStore(pageProps.initialZustandState);
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        onError: (err) => {
          console.log(err);
        },
      }}
    >
      <Provider createStore={createStore}>
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  );
}
