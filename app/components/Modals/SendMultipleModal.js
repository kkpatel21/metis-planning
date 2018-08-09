import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";
import './SendMultipleModal.css'
class SendMultipleModal extends React.Component {
    constructor() {
        super();
        this.state = {
          to: "",
          subject: "",
          text: "",
          open: false,
        };
      }


      onTrigger = () => {
        this.setState({open:true, to: this.props.emailList})
      }
      onCancel = () => {
        this.setState({open:false})
      }

      send = () => {
        this.props.socket.emit('sendMultipleEmail', {to: this.state.to, subject: this.state.subject, message: this.state.text})
        this.onCancel()
      }
      render() {
        return (
          <Modal
          trigger={
            <Button className='sendEmails' onClick={() => this.onTrigger()} floated='right' icon labelPosition='left' primary size='small'>
              <Icon name='mail' /> Send Emails
            </Button>
          }
          onClose={this.onCancel}
          open={this.state.open}
          >
            <Modal.Header>Send Emails</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header />
                <Form >
                  <Form.Field>
                    <label>To: </label>
                    <input
                      placeholder="joe.smith@gmail.com"
                      type="text"
                      value={this.state.to.toString()}
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

export default SendMultipleModal;
