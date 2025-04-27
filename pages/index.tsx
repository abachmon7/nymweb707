import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import WalletConnectButton from '../components/WalletConnectButton'
import TypingEffect from '../components/TypingEffect'

const TOKEN_MINT = 'NYMZrPwuhqWLBv5et9FECfoAbbRoqYB12wjnLcMWDbN'

const TEXT = `Fields of corn, endless and golden, breathing under a stormfield that shouldn't have been there.
She had never missed a night. That bitter feeling again, and the final memory: Nym growing a magical flower, smiling.
Then, nothing. What happened to Nym?`

export default function Home() {
  const { publicKey, connected } = useWallet()
  const { connection } = useConnection()
  const [hasToken, setHasToken] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!publicKey || !connected) {
      setHasToken(false)
      return
    }
    setLoading(true)
    // Consulta SPL tokens
    connection.getParsedTokenAccountsByOwner(publicKey, {
      mint: TOKEN_MINT
    }).then(({ value }) => {
      setHasToken(value.length > 0 && value[0].account.data.parsed.info.tokenAmount.uiAmount > 0)
    }).catch(() => {
      setHasToken(false)
    }).finally(() => setLoading(false))
  }, [publicKey, connected, connection])

  return (
    <>
      <WalletConnectButton />
      <div className="main-content">
        {loading && connected && (
          <div className="text-box">
            Checking for the NYM token in your wallet...
          </div>
        )}
        {hasToken && (
          <div className="text-box">
            <TypingEffect text={TEXT} />
          </div>
        )}
        {!connected && (
          <div className="text-box" style={{ textAlign: 'center' }}>
            Please connect your Solana wallet to check for your NYM token.
          </div>
        )}
        {connected && !loading && !hasToken && (
          <div className="text-box" style={{ textAlign: 'center' }}>
            NYM token not found in your wallet.
          </div>
        )}
      </div>
    </>
  )
}