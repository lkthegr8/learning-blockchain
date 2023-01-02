const assert = require("assert");
// ganache and truffel are providers which helps in connecting to the nodes
// ganache is local
// truffel is online
const ganache = require("ganache");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

// https://rinkeby.infura.io/v3/999ed440324b45bb998ef43878b965a8

// class Car {
//   park() {
//     return "stopped";
//   }
//   drive() {
//     return "vroom";
//   }
// }
// let car;

// describe("Car", () => {
//   beforeEach(() => {
//     car = new Car();
//   });
//   it("Testing Park", () => {
//     assert.equal(car.park(), "stopped");
//   });
//   it("Testing Drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });

let accounts;
let inbox;
beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["hi there!"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("test", () => {
  it("deploying a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "hi there!");
  });

  it("can change the message", async () => {
    // sending a transaction will return a hash of that transaction
    await inbox.methods
      .setMessage("hohoho")
      .send({ from: accounts[0], gas: "1000000" });
    const message = await inbox.methods.message().call();
    assert.equal(message, "hohoho");
  });
});
