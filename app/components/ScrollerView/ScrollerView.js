import React, { Component } from 'react';
import { Menu, Input, Table, Icon, Label} from 'semantic-ui-react'
import './ScrollerView.css'
import { Draggable } from 'react-drag-and-drop'


class ScrollerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.getObjects();
  }

  render() {
    let eventsRender = [];
    this.props.events.forEach(event => {
      eventsRender.push((
          <Draggable
            className="card"
            style={{backgroundImage: `url(/images/${event.uploadFile && event.uploadFile.filename})`}}
            type='event'
            onMouseDown={()=>this.props.sendData(event._id)}
            onClick={()=>this.props.openEvent(event._id)}>
            <div>
              <h2>
                {event.title}
              </h2>
              <p>{event.date}</p>
              <p>{event.startTime} to {event.endTime}</p>
              <p>{event.priority}</p>
            </div>
          </Draggable>
      ))
    })
    return (
      <div>
        {eventsRender.map(event => {
          return event
        })}
      </div>
    )
  }
};

export default ScrollerView
