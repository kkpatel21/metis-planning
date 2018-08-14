import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

class GiveFeedbackModal extends React.Component {
    constructor() {
        super();
        this.state = {
          feedback: '',
          open: false,
          reach: false,
        };
      }

      onTrigger = () => {
        this.setState({open:true})
      }
      onCancel = () => {
        this.setState({open:false})
      }

      toggle = () => {
        this.setState({reach: !this.state.reach})
      }

      submit = () => {
        fetch('/api/newFeedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            feedback: this.state.feedback,
            reach: this.state.reach
          })
        }).then(res => {
          if (res.status === 200) {
            this.setState({feedback: ''})
            this.onCancel()
          }
        })
      }

      render() {
        return (
          <Modal
          trigger={<Menu.Item name='feedback' active={this.state.activeItem ==='feedback'} onClick={() => this.onTrigger()}/>}
          onClose={this.onCancel}
          open={this.state.open}
          >
            <Modal.Header>Give Us Feedback!</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header />
                <Form>
                  <Form.TextArea label='Your Feedback' value={this.state.feedback} onChange={e => this.setState({ feedback: e.target.value})} placeholder="What do you like about our site? What don't you like? i.e (Design, Functionality, etc)" />
                  <Form.Checkbox label='Would you be okay with us reaching out to you for more feedback?' onClick={() => this.toggle()} />
                  <Form.Field>
                    <Button basic color='teal' type="submit" onClick={() => this.submit()}>
                      Submit
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

export default GiveFeedbackModal;
