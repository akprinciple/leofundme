import { AppKitProvider } from './config/AppKitProvider'
import ConnectButton from './config/connectButton'
import ConnectButtonWithHooks from './config/ConnectButtonWithHooks'

function App() {


  return (
    <AppKitProvider>
      <div className=" bg-gray-100 flex  justify-center">
        <h1 className="text-4xl font-bold text-blue-600">LeoFundMe</h1>
        {/* <ConnectButton /> */}
        <ConnectButtonWithHooks />
        
      </div>
    </AppKitProvider>
  )
}

export default App
