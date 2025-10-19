import { Button } from '@mui/material'
import useConnectWallet from '@/components/common/ConnectWallet/useConnectWallet'
import { type SyntheticEvent } from 'react'

const ConnectWalletButton = ({
  onConnect,
  contained = true,
  small = false,
  text,
}: {
  onConnect?: () => void
  contained?: boolean
  small?: boolean
  text?: string
}): React.ReactElement => {
  const connectWallet = useConnectWallet()

  const handleConnect = (e: SyntheticEvent) => {
    // Prevent Next.js event delegation interference
    e.stopPropagation()
    e.preventDefault()

    onConnect?.()
    connectWallet()
  }

  return (
    <Button
      data-testid="connect-wallet-btn"
      onClick={handleConnect}
      variant={contained ? 'contained' : 'text'}
      size={small ? 'small' : 'medium'}
      disableElevation
      fullWidth
      sx={{ fontSize: small ? ['12px', '13px'] : '' }}
    >
      {text || 'Connect'}
    </Button>
  )
}

export default ConnectWalletButton
