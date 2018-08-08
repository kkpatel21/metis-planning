import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

class AddIdeationModal extends React.Component {
  constructor() {
    super();
    this.state = {
      topic: "",
      open: false
    };
  }
  onCreate = () => {
    fetch("/api/addIdeation", {
      method:"POST",
      credentials:"same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.props.eventId,
        topic: this.state.topic
      })
    })
    .then((res) => {
      console.log(res)
      if(res.status === 200){
        alert("topic saved!")
        this.setState({open:false})
        return res.json()
      }
    })
    .then(json => {
        this.props.autoRender(json.ideation)
    })
    .catch(err => {
      alert("Error: "+ err)
    })

  };

  onCancel = () => {
    this.setState({open:false})
  }
  onTrigger = () => {
    this.setState({open:true})
  }
  render() {
    return (
      <Modal
      trigger={<Button onClick={() => this.onTrigger()}>Add a new topic</Button>}
      onClose={this.onCancel}
      open={this.state.open}
      >
        <Modal.Header>Create a new topic</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header />
            <Form >
              <Form.Field>
                <label>Topic</label>
                <input
                  placeholder="New Topic"
                  type="text"
                  onChange={e => this.setState({ topic: e.target.value })}
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

export default AddIdeationModal;
