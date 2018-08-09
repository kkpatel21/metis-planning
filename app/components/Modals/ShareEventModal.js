import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

class ShareEventModal extends React.Component {
    constructor() {
        super();
        this.state = {
          email: "",
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
                    <label>Email </label>
                    <input
                      placeholder="Email"
                      type="text"
                      onChange={e => this.setState({ email: e.target.value })}
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
