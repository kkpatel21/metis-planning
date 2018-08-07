import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

const options = [
  { key: 'n', text: 'Not Coming', value: 'no'},
  { key: 'm', text: 'Pending', value: 'maybe'},
  { key: 'y', text: 'Coming', value: 'yes'},
]

class AddGuestModal extends React.Component {
    constructor() {
        super();
        this.state = {
          name: "",
          email: "",
          status: "pending",
          notes: "",
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
                    <label>Email</label>
                    <input
                      placeholder="Email"
                      type="text"
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Select fluid label='Status' options={options} placeholder='Status' />
                  <Form.Field>
                    <label>Additional Comments</label>
                    <input
                      placeholder="Comments..."
                      type="text"
                      onChange={e => this.setState({ notes: e.target.value })}
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
