import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

class EditTabModal extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      goal: 0,
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.title,
      goal: this.props.goal
    })
  }
  onSave = () => {
    this.props.socket.emit('editTab', {
      title: this.state.title,
      eventId: this.props.eventId,
      goal: this.state.goal,
      index: this.props.index
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
      trigger={<Icon color='grey' name='pencil' onClick={() => this.onTrigger()} />}
      onClose={this.onCancel}
      open={this.state.open}
      >
        <Modal.Header>{this.state.title}</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header />
            <Form >
              <Form.Field>
                <label>Title</label>
                <input
                  placeholder="Title"
                  type="text"
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Goal</label>
                <input
                  placeholder="Goal i.e...10, 20, 30"
                  type="number"
                  value={this.state.goal}
                  onChange={e => this.setState({ goal: e.target.value })}
                />
              </Form.Field>

              <Button type="submit" onClick={() => this.onSave()}>
                Save
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

export default EditTabModal;
