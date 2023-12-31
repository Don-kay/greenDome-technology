import "@/styles/globals.css";
import { store } from "../utilities/strore";
import { SessionProvider } from "next-auth/react";
import { saveState } from "../utilities/localStorage2";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import throttle from "lodash/throttle";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || EmptyLayout;
  const [load, setLoad] = useState(true);

  const persistor = persistStore(store, {}, function () {
    persistor.persist;
  });

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, [store]);

  if (load) {
    return <div>is loading</div>;
  } else {
    return (
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </>
    );
  }
}

const EmptyLayout = ({ children }) => <>{children}</>;
//pesrsit gate delays rendering of app ui until persisted state has been retrieved snd stored
{
  /* <Provider store={store}></Provider> */
}
// <PersistGate persistor={persistor}></PersistGate>
