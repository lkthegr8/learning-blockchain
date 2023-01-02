import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes.js";

function ContributeForm(props) {
  const [value, setvalue] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [loading, setloading] = useState(false);

  const onsubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    const campaign = Campaign(props.address);
    seterrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      await campaign.methods
        .contribute()
        .send({ from: accounts[0], value: web3.utils.toWei(value, "ether") });

      Router.replaceRoute(`/campaigns/${props.address}`);
    } catch (error) {
      seterrorMessage(error.message);
    }
    setloading(false);
    setvalue("");
  };

  return (
    <Form onSubmit={onsubmit} error={!!errorMessage}>
      <Form.Field>
        <label htmlFor="">Amount to Contribute</label>
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
      <Message error header="Oops!" content={errorMessage} />
      <Button loading={loading} primary>
        Contribute!
      </Button>
    </Form>
  );
}

export default ContributeForm;
