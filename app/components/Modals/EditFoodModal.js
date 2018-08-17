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

export default class EditFoodModal extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      contact: "",
      status: "",
      website: "",
      open: false
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.name,
      contact: this.props.contact,
      status: this.props.status,
      website: this.props.website
    })
  }


  onSave = () => {
    let foodData = {
      name: this.state.name,
      contact: this.state.contact,
      status: this.state.status,
      website: this.state.website,
    }
    this.props.socket.emit("saveFood", {foodData:foodData, eventId: this.props.eventId, index: this.props.index, tabIndex: this.props.tabIndex})
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


  render() {
    const options = [
      { key: 1, text: "Confirmed", value: "Confirmed" },
      { key: 2, text: "Pending", value: "Pending" }
    ];
    const value = this.state.status;
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
            <Icon name='pencil' />
          </Button>
        }
        onClose={this.onCancel}
        open={this.state.open}
      >
        <Modal.Header>Caterer</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header />
            <Form>
              <Form.Field>
                <label>Name</label>
                <input
                  placeholder="Name"
                  type="text"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Contact</label>
                <input
                  placeholder="Phone number"
                  type="text"
                  value={this.state.contact}
                  onChange={e => this.setState({ contact: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Website</label>
                <input
                  placeholder="Please insert url"
                  type="text"
                  value={this.state.website}
                  onChange={e => this.setState({ website: e.target.value })}
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
              <Button type="submit" onClick={() => this.onSave()}>
                Save
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
