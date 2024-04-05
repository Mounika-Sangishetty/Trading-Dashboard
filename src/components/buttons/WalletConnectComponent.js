import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '5200145595523b550a5752cbaf050734'

// 2. Create wagmiConfig
const metadata = {
  name: 'CryptoVault',
  description: 'CryptoVault Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum] 
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, 
  enableOnramp: true 
})




export default function WalletConnectComponent({ className, style }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>    
        {/* Pass the className or style down to the w3m-button */}
        <w3m-button className={className} style={style} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
