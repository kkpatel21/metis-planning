import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

const options = [
  { key: 'n', text: 'People', value: 'caterer'},
  { key: 'y', text: 'Location', value: 'venue'},
]

class AddLogisticsTab extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      vORp: '',
    };
  }

  onCreate = () => {
    console.log(this.state.vORp)
    this.props.socket.emit('addLogisticsTab', {
      title: this.state.title,
      eventId: this.props.eventId,
      vORp: this.state.vORp
    })
    this.onCancel()
  }

  onType = (e, value) => {
    this.setState({ vORp: value.value})
  }

  onCancel = () => {
    this.setState({open:false})
  }
  onTrigger = () => {
    this.setState({open:true})
  }

  render() {
    const value = this.state.vORp
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
                <label>Logistic Type</label>
                <Menu compact>
                  <Dropdown
                    onChange={this.onType}
                    placeholder="Type"
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

export default AddLogisticsTab;
