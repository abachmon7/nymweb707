import type { AppProps } from 'next/app'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  SolletWalletAdapter,
  SolletExtensionWalletAdapter,
  SlopeWalletAdapter,
  MathWalletAdapter,
  Coin98WalletAdapter,
  BackpackWalletAdapter,
  NightlyWalletAdapter
} from '@solana/wallet-adapter-wallets'
import '@solana/wallet-adapter-react-ui/styles.css'
import '../styles/globals.css'
import { useMemo } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  // Puedes cambiar mainnet-beta por devnet si quieres testear
  const network = WalletAdapterNetwork.Mainnet
  const endpoint = useMemo(() => 'https://api.mainnet-beta.solana.com', [])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
      new SlopeWalletAdapter(),
      new MathWalletAdapter(),
      new Coin98WalletAdapter(),
      new BackpackWalletAdapter(),
      new NightlyWalletAdapter()
    ],
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}