import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

const options = [
  { key: 'n', text: 'Not Coming', value: 'NotComing'},
  { key: 'm', text: 'Pending', value: 'Pending'},
  { key: 'y', text: 'Coming', value: 'Coming'},
]

class UpdateGuestModal extends React.Component {
    constructor() {
        super();
        this.state = {
          name: "",
          email: "",
          status: "",
          notes: "",
          open: false,
        };
      }

      componentDidMount () {
        this.setState({
          name: this.props.guest.name,
          email: this.props.guest.email,
          status: this.props.guest.status,
          notes: this.props.guest.notes
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
        let updateInvitee = {
          'name': this.state.name,
          'email': this.state.email,
          'status': this.state.status,
          'notes': this.state.notes
        }
        let guestList;

        fetch(`/api/getPeople/${this.props.eventId}`)
        .then(res => res.json())
        .then(json => {
          guestList = json.slice();
          guestList[this.props.index] = updateInvitee
          this.props.saveUpdatedData(guestList)
          this.onCancel()
        })




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

export default UpdateGuestModal;
