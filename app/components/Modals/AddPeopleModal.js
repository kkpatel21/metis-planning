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

export default class AddPeopleModal extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      contact: "",
      status: "",
      price: 0,
      quantity: 0,
option:[],
      pricePerPerson: 0,
      website: "",
      open: false
    };
  }
  onDone = () => {
    // var p = this.state.price
    // var q = this.state.quantity
    // var calculated = (p / q);
    // console.log("PRICE", this.state.price, "QUANTITY", this.state.quantity)
    // console.log("number!!!!!!!!!",calculated)
    let foodData = {
      name: this.state.name,
      contact: this.state.contact,
      status: this.state.status,
      option:[],
      //   price: this.state.price,
      //   quantity: this.state.quantity,
      //   option1: this.state.option1,
      //   option2: this.state.option2,
      //   pricePerPerson: calculated,
      website: this.state.website,
    }
    this.props.socket.emit("addFood", {foodData:foodData, eventId: this.props.eventId, index: this.props.index})
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
          <Button onClick={() => this.onTrigger()}>Add your caterer!</Button>
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
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Contact</label>
                <input
                  placeholder="Phone number"
                  type="text"
                  onChange={e => this.setState({ contact: e.target.value })}
                />
              </Form.Field>
              {/* <Form.Field>
                <label>Overall Price</label>
                <input
                  placeholder="$0.00"
                  type="number"
                  onChange={e => this.setState({ price: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Overall Quantity</label>
                <input
                  placeholder="0"
                  type="number"
                  onChange={e => this.setState({ quantity: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Meal Option - 1</label>
                <input
                  placeholder="ex. Turkey sandwich"
                  type="text"
                  onChange={e => this.setState({ option1: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Meal Option - 2</label>
                <input
                  placeholder="ex. Veggie wrap"
                  type="text"
                  onChange={e => this.setState({ option2: e.target.value })}
                />
              </Form.Field> */}
              <Form.Field>
                <label>Website</label>
                <input
                  placeholder="Please insert url"
                  type="text"
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
