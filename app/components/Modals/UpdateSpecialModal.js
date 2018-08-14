import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

const options = [
  { key: 'n', text: "Can't", value: 'Unable'},
  { key: 'm', text: 'Pending', value: 'Pending'},
  { key: 'y', text: 'Can', value: 'Able'},
]

class UpdateSpecialModal extends React.Component {
    constructor() {
        super();
        this.state = {
          name: "",
          email: "",
          status: "",
          notes: "",
          open: false,
          phone: "",
        };
      }

      componentDidMount () {
        this.setState({
          name: this.props.guest.name,
          email: this.props.guest.email,
          status: this.props.guest.status,
          notes: this.props.guest.notes,
          phone: this.props.guest.phone
        })
      }
      onTrigger = () => {
        this.setState({open:true})
      }
      onCancel = () => {
        this.setState({open:false})
      }

      onStatus = (e, value) => {
        this.setState({ status: value.value})
      }

      onSave = () => {
        let updateCaterer = {
          'name': this.state.name,
          'email': this.state.email,
          'status': this.state.status,
          'notes': this.state.notes,
          'phone': this.state.phone
        }

        this.props.socket.emit('saveCaterer', {eventId: this.props.eventId, updateCaterer: updateCaterer, index: this.props.index})
        this.onCancel()

      }

      render() {

        return (
          <Modal
          trigger={
            <Icon name='pencil' onClick={() => this.onTrigger()}/>
          }
          onClose={this.onCancel}
          open={this.state.open}
          >
            <Modal.Header>{this.state.name}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header />
                <Form >
                  <Form.Field>
                    <label>Name </label>
                    <input
                      placeholder="Name"
                      type="text"
                      value={this.state.name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Phone </label>
                    <input
                      placeholder="Name"
                      type="text"
                      value={this.state.phone}
                      onChange={e => this.setState({ phone: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Email</label>
                    <input
                      placeholder="Email"
                      type="text"
                      value={this.state.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Status</label>
                    <Menu compact>
                      <Dropdown
                        onChange={this.onStatus}
                        placeholder="Status"
                        selection
                        options={options}
                        value={this.state.status}
                      />
                    </Menu>
                  </Form.Field>
                  <Form.Field>
                    <label>Additional Comments</label>
                    <input
                      placeholder="Comments..."
                      type="text"
                      value={this.props.guest.notes}
                      onChange={e => this.setState({ notes: e.target.value })}
                    />
                  </Form.Field>
                  <Button basic color='teal' type="submit" onClick={() => this.onSave()}>
                    Update
                  </Button>
                  <Button basic color='orange' type="submit" onClick={() => this.onCancel()}>
                    Cancel
                  </Button>
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        )
      }
}

export default UpdateSpecialModal;
