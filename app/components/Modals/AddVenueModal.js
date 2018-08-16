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
      lat: "",
      long: ""
    };
  }
  onDone = async () => {
    // console.log("eventId is here*********", this.props.eventId)
    let venue = {
      name: this.state.name,
      status: this.state.status,
      contact: this.state.contact,
      address: this.state.address,
      lat: this.state.lat,
      long: this.state.long,
      email: this.state.email,
    }
    console.log(this.props.index)

    this.props.socket.emit('addVenue', {venueData: venue, index: this.props.index, eventId: this.props.eventId})
    await this.setState({
      open: false,
      address: ""
    })
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

        this.setState({ address: results[0].formatted_address });
        return getLatLng(results[0]);
      })
      .then(latlng => {
        this.setState({lat: latlng.lat, long: latlng.lng})
      })
      .catch(error => console.error("Error", error));
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
