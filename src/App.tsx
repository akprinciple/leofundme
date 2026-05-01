import { useEffect } from 'react'
// import ConnectButton from './config/connectButton'
import ConnectButtonWithHooks from './config/ConnectButtonWithHooks'
import { useIsUserContractPaused } from './hooks/useContract'

function App() {
  const { data: isPaused, isLoading } = useIsUserContractPaused()
  // useEffect(() => {
  //   console.log("Is User Contract Paused?", isPaused)    
  // }, [])
  
  return (
    <div className=" bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">LeoFundMe</h1>
      {/* <ConnectButton /> */}
      <ConnectButtonWithHooks />
      <div className="mt-4">Contract Status: {isLoading ? 'Loading...' : (isPaused ? 'Paused' : 'Active')}</div>
    </div>
  )
}

export default App
