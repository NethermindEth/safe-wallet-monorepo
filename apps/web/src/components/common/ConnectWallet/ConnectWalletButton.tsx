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
    console.log('🔵 ConnectWalletButton: handleConnect called')
    console.log('🔵 Event details:', {
      type: e.type,
      target: e.target,
      currentTarget: e.currentTarget,
      isTrusted: e.isTrusted,
      defaultPrevented: e.defaultPrevented,
      stopPropagation: typeof e.stopPropagation,
      preventDefault: typeof e.preventDefault
    })

    try {
      console.log('🔵 Calling stopPropagation...')
      e.stopPropagation()
      console.log('✅ stopPropagation completed')

      console.log('🔵 Calling preventDefault...')
      e.preventDefault()
      console.log('✅ preventDefault completed')

      console.log('🔵 Calling onConnect callback...')
      onConnect?.()
      console.log('✅ onConnect callback completed')

      console.log('🔵 Calling connectWallet...')
      const result = connectWallet()
      console.log('✅ connectWallet called, result:', result)

      // Check if result is a promise
      if (result && typeof result.then === 'function') {
        console.log('🔵 connectWallet returned a promise, waiting...')
        result.then((walletResult) => {
          console.log('✅ connectWallet promise resolved:', walletResult)
        }).catch((error) => {
          console.error('❌ connectWallet promise rejected:', error)
        })
      }

    } catch (error) {
      console.error('❌ Error in handleConnect:', error)
      console.error('❌ Error stack:', error.stack)
    }
  }

  console.log('🔵 ConnectWalletButton: Rendering button')
  console.log('🔵 connectWallet function:', connectWallet)
  console.log('🔵 onConnect function:', onConnect)

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
