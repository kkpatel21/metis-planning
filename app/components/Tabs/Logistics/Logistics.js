import React, { Component } from "react";
import {
  Input,
  Button,
  List,
  Icon,
  Divider,
  Header,
  Segment
} from "semantic-ui-react";
import "./Logistics.css";
import AddVenueModal from "../../Modals/AddVenueModal";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import EditVenueModal from "../../Modals/EditVenueModal";
import AddPeopleModal from "../../Modals/AddPeopleModal";

export default class Logistics extends React.Component {
  constructor() {
    super();
    this.state = {
      venue: []
    };
  }

  componentDidMount = () => {
    this.props.socket.emit(
      "renderVenue",
      {
        id: this.props.eventId
      },
      res => {
        this.setState({ venue: res.event.logistics });
      }
    );
  };
  onProps = () => {
    this.componentDidMount();
  };
  onDelete = index => {
    console.log("ondelete?");
    this.props.socket.emit(
      "deleteVenue",
      {
        id: this.props.eventId,
        index: index
      },
      res => {
        console.log("got back from deleting venue!!!!", res);
        this.setState({ venue: res.event.logistics });
      }
    );
  };

  render() {
    return (
      <div>
        <div>
          <Header as="h1">Venue</Header>
          <Divider />
        </div>
        {this.state.venue.map((oneVenue, venueI) => (
          <div>
            <Segment
              color={oneVenue.status === "Confirmed" ? "teal" : "orange"}
            >
              <EditVenueModal
                name={oneVenue.name}
                status={oneVenue.status}
                contact={oneVenue.contact}
                address={oneVenue.address}
                uploadFile={oneVenue.uploadFile}
                email={oneVenue.email}
                eventId={this.props.eventId}
                lat={oneVenue.lat}
                long={oneVenue.long}
                index={venueI}
                onProps={this.onProps}
              />
              <Button
                basic
                color="transparent"
                content="Grey"
                size="mini"
                icon
                floated="right"
                type="submit"
                onClick={() => this.onDelete(venueI)}
              >
                <Icon name="delete" />
              </Button>
              <div style={{ display: "flex" }}>
                <div style={{ flexDirection: "row" }}>
                  <MyMapComponent
                    isMarkerShown
                    lat={parseFloat(oneVenue.lat)}
                    long={parseFloat(oneVenue.long)}
                    containerElement={
                      <div style={{ height: `300px`, width: "300px" }} />
                    }
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </div>

                <div
                  style={{
                    flexDirection: "row",
                    textAlign: "left",
                    paddingLeft: "8%",
                    fontFamily: "palatino",
                    fontSize: "20px"
                  }}
                >
                  Name: <strong>{oneVenue.name}</strong> <br />
                  <br />
                  Address: {oneVenue.address} <br />
                  <br />
                  Phone: {oneVenue.contact} <br />
                  <br />
                  Email: {oneVenue.email} <br />
                  <br />
                  Status: {oneVenue.status} <br />
                </div>
              </div>
            </Segment>
          </div>
        ))}
        <br />
        <br />
        <AddVenueModal
          floated="right"
          eventId={this.props.eventId}
          socket={this.props.socket}
          onProps={this.onProps}
        />
        <AddPeopleModal
          floated="right"
          eventId={this.props.eventId}
          socket={this.props.socket}
          onProps={this.onProps}
        />
      </div>
    );
  }
}
const MyMapComponent = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: props.lat, lng: props.long }}
  >
    {props.isMarkerShown && (
      <Marker position={{ lat: props.lat, lng: props.long }} />
    )}
  </GoogleMap>
));
