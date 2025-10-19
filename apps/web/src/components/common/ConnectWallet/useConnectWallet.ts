import { useCallback } from 'react'
import useOnboard, { connectWallet } from '@/hooks/wallets/useOnboard'

const useConnectWallet = () => {
  const onboard = useOnboard()

  console.log('🟡 useConnectWallet: onboard instance:', onboard)
  console.log('🟡 useConnectWallet: onboard type:', typeof onboard)
  console.log('🟡 useConnectWallet: onboard is null?', onboard === null)
  console.log('🟡 useConnectWallet: onboard is undefined?', onboard === undefined)

  return useCallback(() => {
    console.log('🟡 useConnectWallet callback: called')
    console.log('🟡 useConnectWallet callback: onboard:', onboard)

    if (!onboard) {
      console.warn('❌ useConnectWallet: onboard is falsy, returning resolved promise')
      return Promise.resolve(undefined)
    }

    console.log('🟡 useConnectWallet callback: calling connectWallet with onboard')
    try {
      const result = connectWallet(onboard)
      console.log('🟡 useConnectWallet callback: connectWallet result:', result)
      return result
    } catch (error) {
      console.error('❌ useConnectWallet callback: error calling connectWallet:', error)
      throw error
    }
  }, [onboard])
}

export default useConnectWallet
