import { useAppKit, useAppKitAccount } from '@reown/appkit/react'

export default function ConnectButtonWithHooks() {
  const { open } = useAppKit()
  const { isConnected, address } = useAppKitAccount()

  return (
    <div className="flex gap-4">
      {isConnected ? (
        <button onClick={() => open()} className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded'>
        Connected  {address ? `${address.slice(0, 3)}...${address.slice(-3)} ` : ''} 
        </button>
      ) : (
        <button onClick={() => open()} className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded'>
          Connect Wallet
        </button>
      )}
      {/* <button onClick={() => open({ view: 'Networks' })} className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded">Open Network Modal</button> */}
    </div>
  )
}