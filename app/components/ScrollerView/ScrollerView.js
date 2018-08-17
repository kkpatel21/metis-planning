import React, { Component } from 'react';
import { Menu, Input, Table, Icon, Label} from 'semantic-ui-react'
import './ScrollerView.css'
import { Draggable } from 'react-drag-and-drop'
import moment from 'moment'


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
    let sortedE = this.props.events.sort(function(a, b) {
      a = new Date(a.date)
      b = new Date(b.date)
      return a>b ? -1 : a<b ? 1 : 0
    })
    sortedE.forEach(event => {
      let date = moment(event.date.substring(0, 10)).format('dddd, MMMM Do YYYY')
      let status;
      if (event.priority === 'Moderate') {
        status = (<Label color='yellow'>{event.priority}</Label>)
      } else if (event.priority === 'Urgent') {
        status = (<Label color='red'>{event.priority}</Label>)
      } else if (event.priority === 'Low') {
        status = (<Label color='teal'>{event.priority}</Label>)
      }

      let pORa = event.startTime.substring(0, 2);
      let startMinutes = event.startTime.substring(2, 5);
      let startString = pORa + startMinutes + " AM"
      if (parseInt(pORa) > 12) {
        startString = (pORa-12) + startMinutes + ' PM'
      }

      let aORp = event.endTime.substring(0, 2);
      let endMinutes = event.endTime.substring(2, 5);
      let endString = aORp + endMinutes + ' AM'
      if (parseInt(aORp) > 12) {
        endString = (aORp-12) + endMinutes + ' PM'
      }

      eventsRender.push((
          <Draggable
            className="card"
            style={{backgroundImage: `url(/images/${event.uploadFile && event.uploadFile.filename})`}}
            type='event'
            onMouseDown={()=>this.props.sendData(event._id)}
            onClick={()=>this.props.openEvent(event._id)}>
            <div className='renderCard'>
              <h2>
                {event.title}
              </h2>
              <p>{date}</p>
              <p>{startString} to {endString}</p>
              {status}
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
