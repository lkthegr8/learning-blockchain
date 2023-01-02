const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const provider = new HDWalletProvider(
  "joy island right pretty beach lonely margin wire drink hobby penalty capital",
  "https://rinkeby.infura.io/v3/999ed440324b45bb998ef43878b965a8"
);
const web3 = new Web3(provider);
const { interface, bytecode } = require("./compile");

const deploy = async () => {
  // get a list of all accounts
  const accounts = await web3.eth.getAccounts();
  // use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("interface=", interface);
  console.log(
    "address of contract where it is deployed",
    inbox.options.address
  );
  provider.engine.stop();
};

deploy();
