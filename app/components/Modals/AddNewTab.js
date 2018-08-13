import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

class AddNewTab extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      goal: 0,
    };
  }

  onCreate = () => {
    this.props.socket.emit('addTab', {
      title: this.state.title,
      eventId: this.props.eventId,
      goal: this.state.goal
    })
    this.onCancel()
  }

  onCancel = () => {
    this.setState({open:false})
  }
  onTrigger = () => {
    this.setState({open:true})
  }
  render() {
    return (
      <Modal
      trigger={<Icon name='add' onClick={() => this.onTrigger()} />}
      onClose={this.onCancel}
      open={this.state.open}
      >
        <Modal.Header>Create a New Tab</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header />
            <Form >
              <Form.Field>
                <label>Title</label>
                <input
                  placeholder="Title"
                  type="text"
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Goal</label>
                <input
                  placeholder="Goal i.e...10, 20, 30"
                  type="number"
                  onChange={e => this.setState({ goal: e.target.value })}
                />
              </Form.Field>

              <Button type="submit" onClick={() => this.onCreate()}>
                Create
              </Button>
              <Button type="submit" onClick={() => this.onCancel()}>
                Cancel
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
};

export default AddNewTab;
