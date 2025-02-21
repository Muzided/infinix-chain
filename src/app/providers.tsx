// @ts-nocheck
'use client';

import { createAppKit } from '@reown/appkit/react';
import { cookieStorage, createStorage, http } from '@wagmi/core'
import { arbitrum, mainnet, polygon, bsc, polygonAmoy, solanaDevnet, sepolia, bscTestnet, bitcoinTestnet, bitcoin, solana, base } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'
import { ReactNode, useEffect, useState } from 'react';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Your Reown project ID
const projectId = '111df3bd156ddc609f0d5a8bdfddff09';
// const projectId = 'c7592a368024e54dd620166ef4bf8621';

// const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '84561b1dd393c58cdc217e160cc376a5';

// App metadata
const metadata = {
  name: 'Infinixchain',
  description: 'infinixchain – Empowering the Future with Our Own Layer 2 Blockchain',
  url: 'https://infinixchain.com',
  icons: ['https://yourwebsite.com/icon.png']
};

// Available networks for wallet connections
// const networks = [mainnet, arbitrum, polygon, bsc];
const networks = [
  mainnet,
  solana,
  bitcoin,
  bsc,
  polygon,
  base,
];
const wagmiAdapter = new WagmiAdapter({
  // storage: createStorage({
  //   storage: cookieStorage
  // }),
  ssr: true,
  projectId,
  networks
})
// Create the adapters
// const wagmiAdapter = new WagmiAdapter({
//   networks,
//   projectId,
//   ssr: true
// });

const solanaWeb3JsAdapter = new SolanaAdapter({
  projectId,
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});

// 3. Set up Bitcoin Adapter
const bitcoinAdapter = new BitcoinAdapter({
  projectId
})
createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter, bitcoinAdapter], 
  networks,
  projectId,
  metadata,
  allWallets: "SHOW",
  // connectOnInit: false, 
  features: {
    email: false,
    socials: false,
    analytics: true,
  }
});

export function Providers({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const [isInitialized, setIsInitialized] = useState(false);


  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// //@ts-nocheck
// 'use client';

// import { createAppKit } from '@reown/appkit/react';
// import { WagmiProvider } from 'wagmi';
// import { arbitrum, mainnet, polygon, bsc } from '@reown/appkit/networks';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
// import { ReactNode, useEffect, useState } from 'react';
// import { SolanaAdapter } from '@reown/appkit-adapter-solana';
// import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

// // Create a new QueryClient instance
// const queryClient = new QueryClient();

// // Your Reown project ID
// const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '84072b7bf8a52cbefc58fcaceae93a20';

// // App metadata
// const metadata = {
//   name: 'InfinixChain',
//   description: 'InfinixChain – Empowering the Future with Our Own Layer 2 Blockchain',
//   url: 'https://yourwebsite.com',
//   icons: ['https://yourwebsite.com/icon.png']
// };

// // Available networks for wallet connections
// const networks = [mainnet, arbitrum, polygon, bsc];

// // Create the WagmiAdapter instance
// const wagmiAdapter = new WagmiAdapter({
//   networks,
//   projectId,
//   ssr: true
// });

// // 2. Create Solana adapter
// const solanaWeb3JsAdapter = new SolanaAdapter({
//   wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
// });

// // const setAdapter = block_chain === "ETH" || block_chain === "POL" || block_chain === "BNB" ? [wagmiAdapter] : [solanaWeb3JsAdapter]

// // Initialize AppKit
// createAppKit({
//   adapters: setAdapter,
//   networks,
//   projectId,
//   metadata,
//   allWallets: "HIDE",

//   features: {
//     email: false,
//     socials: false,
//     analytics: true,
//   }
// });

// // Create the Providers component
// export function Providers({ children }: { children: ReactNode }) {
//   return (
//     <WagmiProvider config={wagmiAdapter.wagmiConfig}>
//       <QueryClientProvider client={queryClient}>
//         {children}
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }