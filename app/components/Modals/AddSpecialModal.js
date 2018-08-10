import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";
import './AddGuestModal.css'

const options = [
  { key: 'n', text: "Unable", value: 'Unable'},
  { key: 'm', text: 'Pending', value: 'Pending'},
  { key: 'y', text: 'Able', value: 'Able'},
]

class AddSpecialModal extends React.Component {
    constructor() {
        super();
        this.state = {
          name: "",
          email: "",
          status: "",
          notes: "",
          phone: '',
          open: false,
        };
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

      onCreate = () => {
        let newCaterer = {
          'name': this.state.name,
          'email': this.state.email,
          'status': this.state.status,
          'notes': this.state.notes,
          'phone': this.state.phone
        }

        this.props.socket.emit('addCaterer', {newCaterer: newCaterer, eventId: this.props.eventId})
        this.onCancel()
      }

      render() {
        const value = this.state.priority

        return (
          <Modal
          trigger={
            <Button className="addGuest" onClick={() => this.onTrigger()} floated='right' icon labelPosition='left' primary size='small'>
              <Icon name='user' /> Add Special
            </Button>}
          onClose={this.onCancel}
          open={this.state.open}
          >
            <Modal.Header>Invite Someone!</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header />
                <Form >
                  <Form.Field>
                    <label>Name </label>
                    <input
                      placeholder="Name"
                      type="text"
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Phone </label>
                    <input
                      placeholder="Name"
                      type="text"
                      onChange={e => this.setState({ phone: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Email</label>
                    <input
                      placeholder="Email"
                      type="text"
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
                        value={value}
                      />
                    </Menu>
                  </Form.Field>
                  <Form.Field>
                    <label>Additional Comments</label>
                    <input
                      placeholder="Comments..."
                      type="text"
                      onChange={e => this.setState({ notes: e.target.value })}
                    />
                  </Form.Field>
                  <Button basic color='teal' type="submit" onClick={() => this.onCreate()}>
                    Invite
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

export default AddSpecialModal;
