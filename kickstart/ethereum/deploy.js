const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const provider = new HDWalletProvider(
  "joy island right pretty beach lonely margin wire drink hobby penalty capital",
  "https://goerli.infura.io/v3/999ed440324b45bb998ef43878b965a8"
);
const web3 = new Web3(provider);
const compiledFactory = require("./build/CampaignFactory.json");

const deploy = async () => {
  // get a list of all accounts
  const accounts = await web3.eth.getAccounts();
  // use one of those accounts to deploy the contract
  result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
      data: compiledFactory.bytecode,
    })
    .send({ from: accounts[0], gas: "1000000" });

  //   console.log("interface=", interface);
  console.log(
    "address of contract where it is deployed= ",
    result.options.address
  );
  provider.engine.stop();
};

deploy();

// address of the deployed contract= 0xeA82724b96cD201B7f686Fe72D0f20c40570480c
