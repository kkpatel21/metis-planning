import React from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Form,
  Menu,
  Dropdown,
  Icon,
  Checkbox
} from "semantic-ui-react";
import Address from "../Tabs/Logistics/Address/Address";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";

class AddVenueModal extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      status: "",
      contact: "",
      address: "",
      email:"",
      open: false,
      uploadFile: null,
      lat: "",
      long: ""
    };
  }
  onDone = () => {
    // console.log("eventId is here*********", this.props.eventId)
    var venueData = new FormData();
    venueData.append("name", this.state.name);
    venueData.append("status", this.state.status);
    venueData.append("contact", this.state.contact);
    venueData.append("address", this.state.address);
    venueData.append("uploadFile", this.state.uploadFile);
    venueData.append("lat", this.state.lat)
    venueData.append("long", this.state.long)
    venueData.append("email", this.state.email)
    venueData.append("id", this.props.eventId);
    // for (var value of venueData.values()) {
    //   console.log(value);
    // }
    fetch("/api/addVenue", {
      method: "POST",
      body: venueData
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === "success") {
          this.setState({ open: false });
          this.props.onProps()
        } else if (json.status === "error") {
          alert("Error!" + json.error);
        }
      });
  };
  onStatus = (e, value) => {
    this.setState({ status: value.value });
  };
  onCancel = () => {
    this.setState({ open: false });
  };
  onTrigger = () => {
    this.setState({ open: true });
  };
  handleChange = address => {
    this.setState({ address });
  };
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        console.log("what Address-------->", results[0]);

        this.setState({ address: results[0].formatted_address });
        return getLatLng(results[0]);
      })
      .then(latlng => {
        console.log("what LATLONG-------->", latlng);
        this.setState({lat: latlng.lat, long: latlng.lng})
      })
      .catch(error => console.error("Error", error));
  };
  fileChangedHandler = event => {
    this.setState({ uploadFile: event.target.files[0] });
  };
  render() {
    const options = [
      { key: 1, text: "Confirmed", value: "Confirmed" },
      { key: 2, text: "Pending", value: "Pending" }
    ];
    const value = this.state.priority;
    return (
      <Modal
        trigger={
          <Button onClick={() => this.onTrigger()}>Add your venue!</Button>
        }
        onClose={this.onCancel}
        open={this.state.open}
      >
        <Modal.Header>Venue</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header />
            <Form>
              <Form.Field>
                <label>Name</label>
                <input
                  placeholder="Name"
                  type="text"
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <PlacesAutocomplete
                  value={this.state.address}
                  onChange={this.handleChange}
                  onSelect={this.handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading
                  }) => (
                    <div>
                      <input
                        {...getInputProps({
                          placeholder: "Where is the venue?",
                          className: "location-search-input"
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </Form.Field>
              {/* <Form.Field>
                <label>Address</label>
                <input
                  placeholder="Where is the venue?"
                  type="text"
                  onChange={e => this.setState({ date: e.target.value })}
                />
                <Address />
              </Form.Field> */}
              <Form.Field>
                <label>Contact</label>
                <input
                  placeholder="Phone number?"
                  type="text"
                  onChange={e => this.setState({ contact: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input
                  placeholder="Email?"
                  type="text"
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Venue Preview</label>
                <input type="file" onChange={this.fileChangedHandler} />
              </Form.Field>
              <Form.Field>
                <label>Confirmed</label>
                <Menu compact>
                  <Dropdown
                    onChange={this.onStatus}
                    placeholder="Status"
                    selection
                    options={options}
                    value={value}
                  />
                </Menu>
              </Form.Field>
              <Button type="submit" onClick={() => this.onDone()}>
                Done
              </Button>
              <Button type="submit" onClick={() => this.onCancel()}>
                Cancel
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddVenueModal;
