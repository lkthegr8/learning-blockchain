import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, Router } from "../routes.js";

function Header() {
  return (
    <Menu style={{ marginTop: "10px" }}>
      {/* <Menu.Item>Crowd Coin</Menu.Item> */}
      <Link route="/">
        <a className="item">Crowd Coin</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/newCampaign">
          <a className="item">+</a>
        </Link>
        {/* <Menu.Item>Campaigns</Menu.Item>
        <Menu.Item>+</Menu.Item> */}
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
