import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import {
  getChainOptions,
  WalletProvider,
} from "@terra-money/wallet-provider";
import { AuthContextProvider } from './context/AuthContext';


getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <AuthContextProvider >
        <App />
      </AuthContextProvider>
    </WalletProvider>,
    document.getElementById("root")
  );
});

