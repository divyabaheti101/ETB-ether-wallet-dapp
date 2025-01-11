import Button from 'react-bootstrap/Button';
import './App.css';
import { useState } from 'react';
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [shouldDisable, setShouldDisable] = useState(false) //should disable connect button when connecting

  //conenct to metamask wallet
  const connectToMetamask = async() => {
    console.log('Connecting to Metamask...')
    setShouldDisable(true)
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])

      const signer = provider.getSigner()
      const account = await signer.getAddress()

      let balance = await signer.getBalance()

      balance = ethers.utils.formatEther(balance)
      console.log(account);
      console.log(balance);
      
      
      setAccount(account)
      setBalance(balance)
      setIsActive(true)
      setShouldDisable(false)
    } catch (error) {
      console.log('Error connecting: ', error);
      
    }
  }

  const disconenctFromMetamask = async() => {
    try{
      console.log('Disconnecting....');
      
      setAccount('')
      setBalance(0)
      setIsActive(false)
    } catch (error) {
      console.log('Dissconected Wallet from App');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {!isActive ? 
          <>
            <Button variant='secondary' onClick={connectToMetamask} disabled={shouldDisable}>
              <img src='images/metamask.svg' alt='metamask' width='50' height='50' />Connect to Metamask
            </Button>
          </> :
          <>
            <Button variant='danger' onClick={disconenctFromMetamask}>
              <img src='images/wave.svg' alt='disconnect' width='50' height='50' /> Disconnect Metamask {' '}
            </Button>
            <div className='mt-2 mb-2'>Connected Account: {account} </div>
            <div className='mt-2 mb-2'>Balance of Account: {balance} </div>
          </>}
      </header>
    </div>
  );
}

export default App;
