import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

class AddEventModal extends React.Component {
    constructor() {
        super();
        this.state = {
          to: "",
          subject: "",
          main: "",
          open: false,
        };
      }
      onTrigger = () => {
        this.setState({open:true})
      }
      onCancel = () => {
        this.setState({open:false})
      }
      render() {
        const value = this.state.priority
        return (
          <Modal
          trigger={<Icon inverted color='grey' name='mail' size="big" onClick={() => this.onTrigger()} />}
          onClose={this.onCancel}
          open={this.state.open}
          >
            <Modal.Header>Send an email</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header />
                <Form >
                  <Form.Field>
                    <label>To: </label>
                    <input
                      placeholder="Title"
                      type="text"
                      onChange={e => this.setState({ to: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Subject</label>
                    <input
                      placeholder="When is this event?"
                      type="text"
                      onChange={e => this.setState({ subject: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <input
                      placeholder="When is this event?"
                      type="text"
                      onChange={e => this.setState({ main: e.target.value })}
                    />
                  </Form.Field>
                  <Button basic color='teal' type="submit" onClick={() => this.onCreate()}>
                    Send
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