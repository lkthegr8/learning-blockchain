import "./App.css";
import Lottery from "./Lottery";
import web3 from "./web3";
import { useState, useEffect } from "react";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState("");
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const asyncfunctionCall = async () => {
      setManager(await Lottery.methods.manager().call());
      setPlayers(await Lottery.methods.fetchAllPlayers().call());
      setBalance(await web3.eth.getBalance(Lottery.options.address));
    };
    asyncfunctionCall();
  }, []);

  const onsubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage("waiting for transaction success...");
    await Lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(amount, "ether"),
    });
    setMessage("you have been entered!");
  };

  const onclick = async () => {
    const accounts = await web3.eth.getAccounts();
    setMessage("waiting for transaction success...");
    await Lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    setMessage("you have picked a winner");
  };

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>this contract is managed by {manager}</p>
      <p>
        there are currently {players.length} people entered, competing to win
        {web3.utils.fromWei(balance, "ether")} ether
      </p>
      <form onSubmit={onsubmit}>
        <h4>want to try your luck</h4>
        <div>
          <label htmlFor="">amount of ether to enter</label>
          <input
            type="text"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
            }}
          />
          <button>Enter</button>
        </div>
      </form>
      <hr />
      <h4>ready to pick a winner</h4>
      <button onClick={onclick}>Pick a winner</button>
      <hr />

      <h1>{message}</h1>
    </div>
  );
}

export default App;
