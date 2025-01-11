import Button from 'react-bootstrap/Button';
import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import EtherWallet from './artifacts/contracts/EtherWallet.sol/EtherWallet.json'

function App() {
  const etherWalletAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3' //get it from hardhat ignition deploy

  //Metamask handling
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [shouldDisable, setShouldDisable] = useState(false) //should disable connect button when connecting

  //EtherWallet Smart Contract handling
  const [scBalance, setScBalnce] = useState(0)
  const [ethToUseForDeposit, setEthToUseForDeposit] = useState(0)

  useEffect(() => {
    async function getEtherWalletBalance() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(
          etherWalletAddress, EtherWallet.abi, provider
        )

        console.log(contract)
        let scBalance = await contract.balanceOf()
        scBalance = ethers.utils.formatEther(scBalance)
        console.log('scBalance:', scBalance);
        
        setScBalnce(scBalance)
      } catch (error) {
        console.log('Erorr while connecting to Ether smart contract', error);
        
      }
    }
    getEtherWalletBalance()
  }, [])

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
