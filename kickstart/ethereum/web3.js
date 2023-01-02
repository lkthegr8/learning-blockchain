import Web3 from "web3";

let web3;
// const web3 = new Web3(window.ethereum);

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // we aare in the browser and meta mask is installed and injected web3 module into "windows" object
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // we are on the server or not running the metamask
  // we are making our own provider by making use of infura(portal)
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/999ed440324b45bb998ef43878b965a8"
  );
  web3 = new Web3(provider);
}

export default web3;
