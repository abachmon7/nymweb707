import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 100;
`

export default function WalletConnectButton() {
  return (
    <ButtonWrapper>
      <WalletMultiButton />
    </ButtonWrapper>
  )
}