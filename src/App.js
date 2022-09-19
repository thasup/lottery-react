import './App.css';
import web3 from './web3';
import lottery from './lottery';
import { useEffect, useState } from 'react';

function App() {
  console.log(web3.version);
  console.log(lottery);
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    fetchManagerAddress();
    fetchPlayersAddress();
    getBalance();
  }, [manager, balance, winner]);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("Waiting on transaction success...");

    const accounts = await web3.eth.getAccounts();

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });

    setValue("");
    setMessage("You have been entered!");
  };

  const onClick = async (e) => {
    e.preventDefault();
    setMessage("Waiting on transaction success...");

    const accounts = await web3.eth.getAccounts();

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    const fetchWinner = await lottery.methods.winner().call();
    setWinner(fetchWinner);

    setMessage("A winner has been picked!");
  }

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>There are currently {players.length} people entered, competing to win {web3.utils.fromWei(balance, "ether")} ether!</p>

      <hr />

      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <button>Enter</button>
      </form>

      <hr />

      <h4>Ready to pick the winner?</h4>
      <button onClick={onClick}>Pick a winner!</button>
      {winner && (
        <h4>The winner is {winner} !!!</h4>
      )}

      <hr />

      <h5>{message}</h5>
    </div>
  );
}

export default App;
