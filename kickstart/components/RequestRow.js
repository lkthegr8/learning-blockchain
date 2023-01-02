import React from "react";
import { Button, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

function RequestRow(props) {
  const { Row, Cell } = Table;
  const request = props.request;
  const readyToFinalize = request.approvalCount > props.approversCount / 2;

  const onApprove = async (event) => {
    // approveRequest
    const campaign = Campaign(props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.approveRequest(props.id).send({ from: accounts[0] });
  };

  const onFinalize = async (event) => {
    // approveRequest
    const campaign = Campaign(props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods
      .finalizeRequest(props.id)
      .send({ from: accounts[0] });
  };

  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{props.id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{props.approversCount}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button basic color="green" onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button basic color="teal" onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
}

export default RequestRow;
