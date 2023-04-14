"use client";
import {
  connectorsForWallets,
  RainbowKitProvider,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { publicProvider } from "wagmi/providers/public";
import { metaMaskWallet, coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";
import { createClient, WagmiConfig, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import {
  enhanceWalletWithAAConnector,
} from "@zerodevapp/wagmi/rainbowkit";


// paste you project id here copy from zero dev 
const defaultProjectId = '9f86df8d-1038-478f-bc71-0bf58fe4ddf4'

const RpcLogin = () => {
  const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai],
    [publicProvider()]
  );

  const connectors = connectorsForWallets([
    {
      groupName: "EOA Wrapped with AA",
      wallets: [
        enhanceWalletWithAAConnector(metaMaskWallet({ chains }), {
          projectId: defaultProjectId,
        }),
        enhanceWalletWithAAConnector(
          coinbaseWallet({ chains, appName: "Coinbase" }),
          { projectId: defaultProjectId }
        ),
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
      <RainbowKitProvider chains={chains}>
        <ConnectButton label="Login with Wallets" />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default RpcLogin