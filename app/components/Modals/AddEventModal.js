import React from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Form,
  Menu,
  Dropdown,
  Icon,
  Checkbox
} from "semantic-ui-react";


class AddEventModal extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      date: new Date(),
      priority: "",
      startTime: "",
      endTime: "",
      open: false,
      uploadFile: null,
      owner: "",
      eventbrite: false
    };
  }
  fileChangedHandler = event => {
    this.setState({ uploadFile: event.target.files[0] });
  };
  onCreate = () => {
    if(this.state.title === '') {
      alert('Please add an event title!')
    } else if (this.state.startTime === '' || this.state.endTime === '') {
      alert('Please add a time frame for your event!')
    } else if (this.state.priority === '') {
      alert('Please enter the priority of your event!')
    } else {
      var data = new FormData();
      data.append("uploadFile", this.state.uploadFile);
      data.append("title", this.state.title);
      data.append("date", this.state.date);
      data.append("priority", this.state.priority);
      data.append("startTime", this.state.startTime);
      data.append("endTime", this.state.endTime);
      fetch("/api/newEvent", {
        method: "POST",
        credentials: "same-origin",
        body: data
      })
        .then(res => {
          if (res.status === 200) {
            this.props.getObjects();
            this.setState({ open: false });
          }
        })
        .catch(err => {
          alert("Error: " + err);
        });
    }
  };
  onPriority = (e, value) => {
    this.setState({ priority: value.value });
  };
  onCancel = () => {
    this.setState({ open: false });
  };
  onTrigger = () => {
    this.setState({ open: true });
  };
  render() {
    const options = [
      { key: 1, text: "Urgent", value: "Urgent" },
      { key: 2, text: "Moderate", value: "Moderate" },
      { key: 3, text: "Low", value: "Low" }
    ];
    const value = this.state.priority;
    return (
      <Modal
        trigger={
          <Icon
            inverted
            color="grey"
            name="add"
            size="big"
            onClick={() => this.onTrigger()}
          />
        }
        onClose={this.onCancel}
        open={this.state.open}
      >
        <Modal.Header>Create a New Event</Modal.Header>
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
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>Event Date</label>
                  <input
                    placeholder="When is this event?"
                    type="date"
                    onChange={e => {
                      this.setState({ date: e.target.value })}
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label>Event Start Time</label>
                  <input
                    placeholder="When does this event start?"
                    type="time"
                    onChange={e => this.setState({ startTime: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Event End Time</label>
                  <input
                    placeholder="When does this event end?"
                    type="time"
                    onChange={e => this.setState({ endTime: e.target.value })}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Field>
                <label>Thumbnail</label>
                <input
                  placeholder="When is this event?"
                  type="file"
                  onChange={this.fileChangedHandler}
                />
              </Form.Field>
              <Form.Group widths='equal'>
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
              </Form.Group>

            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddEventModal;
