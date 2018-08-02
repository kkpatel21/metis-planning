import React, { Component } from 'react';
import { Menu, Input, Table, Icon, Label} from 'semantic-ui-react'
import './ScrollerView.css'
import io from 'socket.io-client'

class ScrollerView extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:8888')
    this.state = {
      events: []
    };
  }

  getObjects = () => {
    this.socket.emit('fetchEvents', (res) => {
      if (res.err) {
        return alert(res)
      } else {
        this.setState({
          events: res.events
        })
      }
    })
  }

  componentDidMount() {
    this.getObjects();
  }


  render() {
    if (this.props.cards) {
      this.getObjects()
      this.props.updateCards()
    }
    let eventsRender = [];
    this.state.events.forEach(event => {
      eventsRender.push((
        <div className="card">
          <h2>
            {event.title}
          </h2>
          <p>{event.date}</p>
          <p>{event.startTime} to {event.endTime}</p>
          <p>{event.priority}</p>
        </div>))
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
