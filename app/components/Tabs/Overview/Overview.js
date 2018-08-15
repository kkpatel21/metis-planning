import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import EditEventModal from '../../Modals/EditEventModal'

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {}
    }
  }

  componentDidMount() {
    this.props.socket.emit('getEventInfo', {eventId: this.props.eventId})
    this.props.socket.on('getEvent', (data) => {
      console.log(data.event)
      this.setState({event: data.event})
    })
  }
  render() {
    console.log(this.state.event)
    return(
      <div>
        <Header as='h1'>{this.state.event.title}</Header>
        This section will be developed at the end.
        <EditEventModal socket={this.props.socket} eventId={this.props.eventId} />
      </div>
    )
  }
}
