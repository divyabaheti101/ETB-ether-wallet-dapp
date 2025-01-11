import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button variant='secondary'>
          <img src='images/metamask.svg' alt='metamask' width='50' height='50' />Connect to Metamask
        </Button>
        <div className='mt-2 mb-2'>Connected Account: </div>
        <Button variant='danger'>
          <img src='images/wave.svg' alt='disconnect' width='50' height='50' /> Disconnect Metamask {' '}
        </Button>
      </header>
    </div>
  );
}

export default App;
