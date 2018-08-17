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


class EditEventModal extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      date: '',
      priority: "",
      startTime: "",
      endTime: "",
      open: false,
      uploadFile: null,
      owner: ""
    };
  }
  fileChangedHandler = event => {
    this.setState({ uploadFile: event.target.files[0] });
  };

  componentDidMount() {
    this.props.socket.emit('getEventInfoInside', {eventId: this.props.eventId})
    this.props.socket.on('getEventInside', (data) => {
      this.setState({
        title: data.event.title,
        date: data.event.date,
        priority: data.event.priority,
        startTime: data.event.startTime,
        endTime: data.event.endTime,
        owner: data.event.owner,
      })
    })

  }
  onSave = () => {
    // console.log(req.user)
    var data = new FormData();
    data.append("uploadFile", this.state.uploadFile);
    data.append("title", this.state.title);
    data.append("date", this.state.date);
    data.append("priority", this.state.priority);
    data.append("startTime", this.state.startTime);
    data.append("endTime", this.state.endTime);
    let eventInfo = {
      title: this.state.title,
      date: this.state.date,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    }
    fetch('api/saveEvent', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventInfo: eventInfo,
        eventId: this.props.eventId
      })
    })
    .then(res => {
      if (res.status === 200) {
        this.props.updateEvent(eventInfo)
        this.setState({ open: false})
      }
    })
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
    let formatedDate = this.state.date.substring(0, 10)
    return (
      <Modal
        trigger={
          <Button className='editModal' onClick={() => this.onTrigger()} floated='right' icon labelPosition='left' primary size='small'>
            <Icon name='pencil' /> Edit Event
          </Button>
        }
        onClose={this.onCancel}
        open={this.state.open}
      >
        <Modal.Header>Edit Your Event: {this.state.title}</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header />
            <Form>
              <Form.Field>
                <label>Title</label>
                <input
                  placeholder="Title"
                  type="text"
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </Form.Field>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>Event Date</label>
                  <input
                    type="date"
                    value={formatedDate}
                    onChange={e => this.setState({ date: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Event Start Time</label>
                  <input
                    placeholder="When does this event start?"
                    type="time"
                    value={this.state.startTime}
                    onChange={e => this.setState({ startTime: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Event End Time</label>
                  <input
                    placeholder="When does this event end?"
                    type="time"
                    value={this.state.endTime}
                    onChange={e => this.setState({ endTime: e.target.value })}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Field>
                <label>Change Thumbnail</label>
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
                      value={this.state.priority}
                    />
                  </Menu>
                </Form.Field>
                <Button type="submit" onClick={() => this.onSave()}>
                  Save
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

export default EditEventModal;
