import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";
import './ShareEventModal.css'

class ShareEventModal extends React.Component {
    constructor() {
        super();
        this.state = {
          email: "",
          name: '',
          phone: '',
          notes: '',
          role: '',
          open: false,
        };
      }
      onTrigger = () => {
        this.setState({open:true})
      }
      onCancel = () => {
        this.setState({open:false})
      }

      onShare = () => {
        let newCollaborator = {
          'email': this.state.email,
          'name': this.state.name,
          'phone': this.state.phone,
          'notes': this.state.notes,
          'role': this.state.role
        }

        this.props.socket.emit('addCollaborator', {eventId: this.props.eventId, collaborator: newCollaborator})
        this.onCancel()
      }

      render() {
        return (
          <Modal
          trigger={
            <Button className="shareEvent" onClick={() => this.onTrigger()} floated='right' icon labelPosition='left' primary size='small'>
              <Icon name='user' /> Share Event
            </Button>}
          onClose={this.onCancel}
          open={this.state.open}
          >
            <Modal.Header>Plan With Someone!</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header />
                <Form >
                  <Form.Field>
                    <label>Name</label>
                    <input
                      placeholder="Name"
                      type="text"
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Phone</label>
                    <input
                      placeholder="Phone"
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
                    <label>Role</label>
                    <input
                      placeholder="Role"
                      type="text"
                      onChange={e => this.setState({ role: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Notes</label>
                    <input
                      placeholder="Notes"
                      type="text"
                      onChange={e => this.setState({ notes: e.target.value })}
                    />
                  </Form.Field>

                  <Button basic color='teal' type="submit" onClick={() => this.onShare()}>
                    Share
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

export default ShareEventModal;
