import './App.css';
import web3 from './web3';
import lottery from './lottery';
import { useEffect, useState } from 'react';

function App() {
  console.log(web3.version);
  web3.eth.getAccounts().then(console.log);
  console.log(lottery);
  const [manager, setManager] = useState("");

  useEffect(() => {
    fetchManagerAddress();
  }, [manager]);

  const fetchManagerAddress = async () => {
    const manager = await lottery.methods.manager().call();
    setManager(manager);
  }

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
    </div>
  );
}

export default App;
