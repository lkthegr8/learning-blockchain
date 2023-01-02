import React, { useEffect } from "react";
import factory from "../ethereum/factory";
import "semantic-ui-css/semantic.min.css";
import { Button, Card } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link, Router } from "../routes.js";

function index({ campaigns }) {
  function renderCampaigns() {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }
  console.log(campaigns);
  // useEffect(() => {
  //   const asyncfunctionCall = async () => {
  //     const campaigns = await factory.methods.getDeployedCampaigns().call();
  //     // setPlayers(await Lottery.methods.fetchAllPlayers().call());
  //     // setBalance(await web3.eth.getBalance(Lottery.options.address));
  //     console.log(campaigns);
  //   };
  //   asyncfunctionCall();
  // }, []);

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>

        <Link route="campaigns/newCampaign">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        {renderCampaigns()}
      </div>
    </Layout>
  );
}

index.getInitialProps = async (ctx) => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default index;
