import '@rainbow-me/rainbowkit/styles.css'

import { PropsWithChildren } from 'preact/compat'
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import env from 'helpers/env'

const { chains, publicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: env.VITE_ALCHEMY_KEY }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Will Robinson Bot',
  projectId: '6d004d5fa2d2d11ccee8520bf835bf58',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export default function ({ children }: PropsWithChildren) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode chains={chains} theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
