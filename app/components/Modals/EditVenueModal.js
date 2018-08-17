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

class EditVenueModal extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      status: "",
      contact: "",
      address: "",
      email: "",
      open: false,
      uploadFile: null,
      lat: "",
      long: ""
    };
  }
  componentDidMount(){
      this.setState({
          name: this.props.name,
          status: this.props.status,
          contact: this.props.contact,
          address: this.props.address,
          email: this.props.email,
          lat: this.props.lat,
          long: this.props.long
      })
  }

  onDone = () => {
    var venueData = {
      name: this.state.name,
      status: this.state.status,
      contact: this.state.contact,
      address: this.state.address,
      lat: this.state.lat,
      long: this.state.long,
      email: this.state.email,
    }
    console.log(this.props.tabIndex)
    this.props.socket.emit('editVenue', {venue: venueData, eventId: this.props.eventId, tabIndex: this.props.tabIndex, index: this.props.index})
    this.onCancel()
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
        this.setState({ lat: latlng.lat, long: latlng.lng });
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
          <Button
            basic
            color="transparent"
            content="Grey"
            size="mini"
            icon
            floated="right"
            type="submit"
            onClick={() => this.onTrigger()}
          >
            <Icon name="pencil" />
          </Button>
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
                value={this.state.name}
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
              <Form.Field>
                <label>Contact</label>
                <input
                value={this.state.contact}
                  placeholder="Phone number?"
                  type="text"
                  onChange={e => this.setState({ contact: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input
                value={this.state.email}
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

export default EditVenueModal;
