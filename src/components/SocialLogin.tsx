"use client";
import {
  connectorsForWallets,
  RainbowKitProvider,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { publicProvider } from "wagmi/providers/public";
import {
  googleWallet,
  facebookWallet,
  githubWallet,
  enhanceWalletWithAAConnector,
} from "@zerodevapp/wagmi/rainbowkit";

import { createClient, WagmiConfig, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";


const defaultProjectId = '9f86df8d-1038-478f-bc71-0bf58fe4ddf4'


const SocialLogin = () => {
    const { chains, provider, webSocketProvider } = configureChains(
        [polygonMumbai],
        [publicProvider()]
      );
    
      const connectors = connectorsForWallets([
        {
          groupName: "Social (AA)",
          wallets: [
            googleWallet({ options: { projectId: defaultProjectId } }),
            facebookWallet({ options: { projectId: defaultProjectId } }),
            githubWallet({ options: { projectId: defaultProjectId } }),
          ],
        },
      ]);
    
      const wagmiClient = createClient({
        autoConnect: false,
        connectors,
        provider,
        webSocketProvider,
      });
    
      return (
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} modalSize="compact">
            <ConnectButton label="Login with Social"/>
          </RainbowKitProvider>
        </WagmiConfig>
      );
}

export default SocialLogin

