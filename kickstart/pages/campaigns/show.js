import React from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign.js";
import web3 from "../../ethereum/web3";
import { Card, Grid, Button } from "semantic-ui-react";
import ContributeForm from "../../components/ContributeForm";
import { Link, Router } from "../../routes.js";

function show(props) {
  const rendercards = () => {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager,
    } = props;
    const items = [
      {
        header: manager,
        description:
          "Manager created this campaign and can create request to withdraw money",
        meta: "Address of Manager",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        description:
          "You must contribute atleast this much to become an approver",
        meta: "Minimum Contribution (wei)",
      },
      {
        header: requestsCount,
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers.",
        meta: "Number of Requests",
      },
      {
        header: approversCount,
        description:
          "Number of people who have already donated to this campaign.",
        meta: "Number of Approvers",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        description:
          "Balance is how much money this campaign has left to spend.",
        meta: "Campaign Balance (ether)",
      },
    ];
    return <Card.Group items={items} />;
  };
  return (
    <Layout>
      <h3>Campaign Details</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{rendercards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

show.getInitialProps = async (props) => {
  const campaign = Campaign(props.query.address);
  const summary = await campaign.methods.getSummary().call();
  return {
    address: props.query.address,
    minimumContribution: summary["0"],
    balance: summary["1"],
    requestsCount: summary["2"],
    approversCount: summary["3"],
    manager: summary["4"],
  };
};

export default show;
