import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

class SendEmailModal extends React.Component {
    constructor() {
        super();
        this.state = {
          to: "",
          subject: "",
          text: "",
          open: false,
        };
      }

      componentDidMount() {
        console.log('hey')
        this.setState({
          to: this.props.guest.email
        })
      }
      onTrigger = () => {
        this.setState({open:true, to: this.props.guest.email})
      }
      onCancel = () => {
        this.setState({open:false})
      }

      send = () => {
        this.props.handleEmail(this.state.to, this.state.subject, this.state.text)
        this.onCancel()
      }
      render() {
        const value = this.state.priority
        return (
          <Modal
          trigger={<Icon name='mail' onClick={() => this.onTrigger()} />}
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
                      placeholder="joe.smith@gmail.com"
                      type="text"
                      value={this.state.to}
                      onChange={e => this.setState({ to: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Subject: </label>
                    <input
                      placeholder="Subject"
                      type="text"
                      onChange={e => this.setState({ subject: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Message: </label>
                    <textarea rows='5'
                      placeholder="Hey ..."
                      type="text"
                      onChange={e => this.setState({ text: e.target.value })}>
                    </textarea>
                  </Form.Field>
                  <Form.Field>
                    <Button basic color='teal' type="submit" onClick={() => this.send()}>
                      Send
                    </Button>
                    <Button basic color='orange' type="submit" onClick={() => this.onCancel()}>
                      Cancel
                    </Button>
                  </Form.Field>
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        )
      }
}

export default SendEmailModal;
