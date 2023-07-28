"use client";
import "../styles/globals.css";
import { store } from "../utilities/strore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "react-datetime/css/react-datetime.css";

import Modal from "react-modal";

export default function RootLayout({ children }) {
  Modal.setAppElement("#body");
  const pesistore = persistStore(store, {}, function () {
    pesistore.persist;
  });
  return (
    <html>
      <head>
        <title>Greendome Technologies</title>
      </head>
      <body id="body">
        <Provider store={store}>
          <PersistGate persistor={pesistore}>{children}</PersistGate>
        </Provider>
      </body>
    </html>
  );
}

export const metaData = {
  title: "Home",
  description: "My Updated Version",
};
