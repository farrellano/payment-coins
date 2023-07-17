import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createClient,
  configureChains,
  sepolia,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { ShoppingCartContextProvider } from "../context/shoppingCartContextProvider";

const { chains, provider, webSocketProvider } = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: 'RFfll0H6n-vblRdj-0uqqtuq2a6P7iyG' })]
);

const client = createClient({

  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ChakraProvider>
        <ShoppingCartContextProvider>
        <Component {...pageProps} />  
        </ShoppingCartContextProvider>
      </ChakraProvider>
    </WagmiConfig>
  );
}
