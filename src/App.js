import './App.css';
import web3 from './web3';
import lottery from './lottery';
import { useEffect, useState } from 'react';

function App() {
  console.log(web3.version);
  web3.eth.getAccounts().then(console.log);
  console.log(lottery);
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    fetchManagerAddress();
    fetchPlayersAddress();
    getBalance();
  }, [manager, balance]);

  const fetchManagerAddress = async () => {
    const manager = await lottery.methods.manager().call();
    setManager(manager);
  }

  const fetchPlayersAddress = async () => {
    const players = await lottery.methods.getAllPlayers().call();
    setPlayers(players);
  }

  const getBalance = async () => {
    const balance = await web3.eth.getBalance(lottery.options.address)
    setBalance(balance);
  }

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>There are currently {players.length} people entered, competing to win {web3.utils.fromWei(balance, "ether")} ether!</p>

      <hr />

      <form>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <button>Enter</button>
      </form>
    </div>
  );
}

export default App;
