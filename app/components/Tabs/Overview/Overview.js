import React, { Component } from 'react'
import ShareEventModal from '../../Modals/ShareEventModal'

export default class Overview extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        <ShareEventModal socket={this.props.socket} eventId={this.props.eventId}/>
        <h1>This is the Overview</h1>
        This section will be developed at the end.
      </div>
    )
  }
}
