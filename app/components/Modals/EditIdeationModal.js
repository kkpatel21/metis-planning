import React from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Form,
  Menu,
  Dropdown,
  Icon
} from "semantic-ui-react";

class EditIdeationModal extends React.Component {
  constructor() {
    super();
    this.state = {
      topic: "",
      open: false,
      newTopic: ""
    };
  }
  //   onDone = (topic) => {
  //     this.props.socket.emit("editIdeation", {
  //       id: this.props.eventId,
  //       topic: this.state.topic,
  //       newTopic: this.state.newTopic
  //     }, (res) => {
  //       if(res.event){
  //         console.log(res.event)
  //         alert("topic saved!");
  //       }
  //       if(res.err){
  //         alert("There was an error: ", res.err)
  //       }
  //     });
  //   };

  onCancel = () => {
    this.setState({ open: false });
  };
  onTrigger = () => {
    this.setState({ open: true });
  };
  render() {
    return (
      <Modal
        trigger={
          <Button basic color='transparent' content='Grey' size="mini" icon floated="right">
            <Icon onClick={() => this.onTrigger()} name="pencil" />
          </Button>
        }
        onClose={this.onCancel}
        open={this.state.open}
      >
        <Modal.Header>Edit topic</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header />
            <Form>
              <Form.Field>
                <label>Topic</label>
                <input
                  placeholder="New Topic"
                  type="text"
                  onChange={e => this.setState({ newTopic: e.target.value })}
                />
              </Form.Field>
              <Button
                type="submit"
                onClick={() =>
                  this.props.onDone(
                    this.props.oneTopic.topic,
                    this.state.newTopic,
                    this.onCancel.bind(this)
                  )
                }
              >
                Done
              </Button>
              <Button type="submit" onClick={() => this.onCancel()}>
                Cancel
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default EditIdeationModal;
