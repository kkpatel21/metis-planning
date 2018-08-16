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

export default class Venue extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],

    };
  }

  componentDidMount = () => {
    this.props.socket.emit(
      "renderVenue",
      {
        id: this.props.eventId,
        index: this.props.index
      },
      res => {
        console.log(res.event.allLogistics[res.index].data )
        this.setState({ data: res.event.allLogistics[res.index].data });
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
        this.setState({ data: res.event.allLogistics });
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
        {this.state.data.map((oneVenue, venueI) => (
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
                  {/* <Icon name="marker" /> */}
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
          index={this.props.index}
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
