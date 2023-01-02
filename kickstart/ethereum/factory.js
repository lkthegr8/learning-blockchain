import web3 from "./web3.js";

const address = "0xeA82724b96cD201B7f686Fe72D0f20c40570480c";
import CampaignFactory from "./build/CampaignFactory.json";

export default new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  address
);
