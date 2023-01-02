const routes = require("next-routes")();

routes
  .add("/campaigns/newCampaign", "/campaigns/newCampaign")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests", "campaigns/requests")
  .add("/campaigns/:address/requests/new", "campaigns/requests/new");

module.exports = routes;
