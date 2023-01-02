const assert = require("assert");
// ganache and truffel are providers which helps in connecting to the nodes
// ganache is local network
// truffel is online network
const ganache = require("ganache");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

// https://rinkeby.infura.io/v3/999ed440324b45bb998ef43878b965a8

let accounts;
let lottery;

describe("lottery contract", () => {
  beforeEach(async () => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // use one of those accounts to deploy the contract
    lottery = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
        data: bytecode,
      })
      .send({ from: accounts[0], gas: "1000000" });
  });

  it("deploys a contract", () => {
    assert.ok(lottery.options.address);
  });

  it("enter function one person", async () => {
    const message = await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.11", "ether"),
    });
    const players = await lottery.methods
      .fetchAllPlayers()
      .call({ from: accounts[0] });
    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it("enter function multiple person", async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.11", "ether"),
    });
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.11", "ether"),
    });
    await lottery.methods.enter().send({
      from: accounts[3],
      value: web3.utils.toWei("0.11", "ether"),
    });
    const players = await lottery.methods
      .fetchAllPlayers()
      .call({ from: accounts[0] });
    assert.equal(accounts[1], players[0]);
    assert.equal(accounts[2], players[1]);
    assert.equal(accounts[3], players[2]);
    assert.equal(3, players.length);
  });

  it("min amount of ether to enter", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei("0.1", "ether"),
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });
  it("min amount of ether to enter", async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1],
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("sends montey to the winner and resets the players array", async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("2", "ether"),
    });

    const initialBalance = await web3.eth.getBalance(accounts[1]);

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    const finalBalance = await web3.eth.getBalance(accounts[1]);
    const difference = finalBalance - initialBalance;
    assert(difference > web3.utils.toWei("1.8", "ether"));
    const players = await lottery.methods
      .fetchAllPlayers()
      .call({ from: accounts[0] });
    assert(players.length == 0);
  });
});
