import React, { Component } from "react";
import { Input, Button, List, Icon, Divider, Grid } from "semantic-ui-react";
import "./Logistics.css";
import AddVenueModal from "../../Modals/AddVenueModal"


export default class Logistics extends React.Component {
  constructor() {
    super();
    this.state = {
        venue: false
    };
  }

  componentDidMount = () => {
      
  }

  render() {
    return (
      <div>
          <AddVenueModal eventId={this.props.eventId} socket={this.props.socket}/>
      </div>
    );
  }
}
