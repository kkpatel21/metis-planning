import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";



class UpdateCollaboratorModal extends React.Component {
    constructor() {
        super();
        this.state = {
          name: "",
          email: "",
          phone: "",
          notes: "",
          role: '',
          open: false,
        };
      }

      componentDidMount () {
        this.setState({
          name: this.props.guest.name,
          email: this.props.guest.email,
          phone: this.props.guest.phone,
          notes: this.props.guest.notes,
          role: this.props.guest.role
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
        let updateCollaborator = {
          'name': this.state.name,
          'email': this.state.email,
          'phone': this.state.phone,
          'notes': this.state.notes,
          'role': this.state.role
        }

        this.props.socket.emit('saveCollab', {eventId: this.props.eventId, updateCollaborator: updateCollaborator, index: this.props.index})
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
                    <label>Phone</label>
                    <input
                      placeholder="Phone"
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
                    <label>Role</label>
                    <input
                      placeholder="Role"
                      type="text"
                      value={this.state.role}
                      onChange={e => this.setState({ role: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Additional Comments</label>
                    <input
                      placeholder="Comments..."
                      type="text"
                      value={this.state.notes}
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

export default UpdateCollaboratorModal;
