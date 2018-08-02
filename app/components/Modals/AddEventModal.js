import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

class AddEventModal extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      date: new Date(),
      priority: "",
      startTime: "",
      endTime: "",
      open: false
    };
  }
  onCreate = () => {
    console.log(this.state.startTime)
    fetch("/api/newEvent", {
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        title: this.state.title,
        priority: this.state.priority,
        date: this.state.date,
        startTime: this.state.startTime,
        endTime: this.state.endTime
      })
    })
    .then((res) => {
      console.log(res)
      if(res.status === 200){
        alert("Event made! "+this.state.title + this.state.date + this.state.priority);
            this.setState({open:false})
      }
    })
    .catch(err => {
      alert("Error: "+ err)
    })

  };
  onPriority = (e, value) => {
      console.log(value)
    this.setState({ priority: value.value })
  }
  onCancel = () => {
    console.log('we out here')
    this.setState({open:false})
  }
  onTrigger = () => {
    console.log('we in here')
    this.setState({open:true})
  }
  render() {
    const options = [
        { key: 1, text: 'Urgent', value: "Urgent" },
        { key: 2, text: 'Moderate', value: "Moderate" },
        { key: 3, text: 'Low', value: "Low" },
      ]
    const value = this.state.priority
    return (
      <Modal
      trigger={<Icon inverted color='grey' name='add' size="big" onClick={() => this.onTrigger()} />}
      onClose={this.onCancel}
      open={this.state.open}
      >
        <Modal.Header>Create a new event</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header />
            <Form>
              <Form.Field>
                <label>Title</label>
                <input
                  placeholder="Title"
                  type="text"
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Event Date</label>
                <input
                  placeholder="When is this event?"
                  type="date"
                  onChange={e => this.setState({ date: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Event Start Time</label>
                <input
                  placeholder="When is this event?"
                  type="time"
                  onChange={e => this.setState({ startTime: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Event End Time</label>
                <input
                  placeholder="When is this event?"
                  type="time"
                  onChange={e => this.setState({ endTime: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Priority</label>
                <Menu compact>
                  <Dropdown
                    onChange={this.onPriority}
                    placeholder="Priority"
                    selection
                    options={options}
                    value={value}
                    />
                </Menu>
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

export default AddEventModal;
