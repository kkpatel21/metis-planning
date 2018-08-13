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
      open: false,
      uploadFile: null,
      owner: ""
    };
  }
  fileChangedHandler = event => {
    this.setState({ uploadFile: event.target.files[0] });
  };
  onDone = () => {
    var data = new FormData();
    data.append("name", this.state.name);
    data.append("status", this.state.status);
    data.append("contact", this.state.contact);
    data.append("address", this.state.address);
    data.append("uploadFile", this.state.uploadFile);
    data.append("id", this.props.eventId);
    for (var value of data.values()) {
      console.log(value);
    }
    this.props.socket.emit("addVenue", data, res => {
      console.log(res);
      this.setState({ open: false });
    });
  };
  onStatus = (e, value) => {
    this.setState({ priority: value.value });
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
          console.log("what dis-------->",results[0])
          this.setState({address: results[0].formatted_address})
        })
      .catch(error => console.error('Error', error));
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
                  onChange={e => this.setState({ startTime: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input
                  placeholder="Email?"
                  type="text"
                  onChange={e => this.setState({ endTime: e.target.value })}
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
