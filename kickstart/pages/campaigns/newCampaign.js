import React, { useEffect, useState } from "react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Link, Router } from "../../routes.js";

const newCampaign = () => {
  const [minimumContribution, setminimumContribution] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [loading, setloading] = useState(false);

  const onsubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    seterrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      await factory.methods
        .createCampaign(minimumContribution)
        .send({ from: accounts[0] });
      Router.pushRoute("/");
    } catch (error) {
      seterrorMessage(error.message);
    }
    setloading(false);
  };

  return (
    <Layout>
      <h3>Create a Campaign.</h3>
      <Form onSubmit={onsubmit} error={errorMessage}>
        <Form.Field>
          <label htmlFor="">Minimum Contribution</label>
          <Input
            value={minimumContribution}
            onChange={(event) => {
              setminimumContribution(event.target.value);
            }}
            fluid
            label="wei"
            placeholder=""
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default newCampaign;
