import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { Link, Router } from "../../../routes.js";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import { Button, Form, Input, Message } from "semantic-ui-react";

function RequestNew(props) {
  const [value, setvalue] = useState("");
  const [description, setdescription] = useState("");
  const [recipient, setrecipient] = useState("");

  //
  const [errorMessage, seterrorMessage] = useState("");
  const [loading, setloading] = useState(false);

  const onsubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    seterrorMessage("");
    const campaign = Campaign(props.address);
    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "Ether"), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${props.address}/requests`);
    } catch (error) {
      seterrorMessage(error.message);
    }
    setloading(false);
  };

  return (
    <Layout>
      <Link route={`/campaigns/${props.address}/requests/`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request!</h3>
      <Form onSubmit={onsubmit} error={!!errorMessage}>
        <Form.Field>
          <label htmlFor="">Description</label>
          <Input
            value={description}
            onChange={(event) => {
              setdescription(event.target.value);
            }}
            fluid
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Value in Ether</label>
          <Input
            value={value}
            onChange={(event) => {
              setvalue(event.target.value);
            }}
            fluid
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => {
              setrecipient(event.target.value);
            }}
            fluid
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}

RequestNew.getInitialProps = async (props) => {
  const { address } = props.query;
  return {
    address,
  };
};
export default RequestNew;
