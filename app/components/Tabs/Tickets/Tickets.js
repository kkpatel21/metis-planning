import React, { Component } from "react";
import { Input, Button, List, Icon, Divider, Grid } from "semantic-ui-react";
import "./Tickets.css";


export default class Tickets extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount = () => {
      
  }
  onTicket = () => {
      fetch("https://www.eventbriteapi.com/v3/users/me/?token=TOR2VOSILY3A5NNE2ZZG")
      .then(res => res.json())
      .then(json => {
          console.log("MY INFOOOOO",json)
      })
  }

  onEventInfo = () => {
      fetch("https://www.eventbriteapi.com/v3/users/me/owned_events/?token=TOR2VOSILY3A5NNE2ZZG")
      .then(res => res.json())
      .then(json => {
          console.log("EVENT INFOOO",json)
      })
  }

  render() {
    return (
      <div>
        <Button onClick={this.onTicket}>User info</Button>
        <Button onClick={this.onEventInfo}>Event info</Button>
      </div>
    );
  }
}
