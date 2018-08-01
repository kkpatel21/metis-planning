import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

export default class ModalModalExample extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      date: new Date(),
      priority: ""
    };
  }
  onCreate = () => {
    alert(this.state.title + this.state.date + this.state.priority);
  };
  onPriority = (e, value) => {
      console.log(value)
    this.setState({ priority: value.value })
  }
  render() {
    const options = [
        { key: 1, text: 'Urgent', value: "Urgent" },
        { key: 2, text: 'Moderate', value: "Moderate" },
        { key: 3, text: 'Low', value: "Low" },
      ]
    const value = this.state.priority
    return (
      <Modal trigger={<Icon inverted color='grey' name='add' size="big" />}>
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
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
