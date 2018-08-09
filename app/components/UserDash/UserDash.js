import React, { Component } from 'react';
import { Menu, Input, Table, Icon, Label} from 'semantic-ui-react'
import './UserDash.css';
import CalendarView from '../CalendarView/CalendarView.js'
import Toggle from 'react-toggle'
import AddEventModal from '../Modals/AddEventModal.js'
import ScrollerView from '../ScrollerView/ScrollerView.js'
import { Droppable } from 'react-drag-and-drop'
import Event from '../Event/Event.js'

class UserDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: true,
      idBeingDeleted: "",
      openEvent: false,
      eventId: "",
      events: []
    };
  }

  componentDidMount() {
    this.props.socket.on('fetchEvents', (data) =>  {
      this.getObjects();
    })
  }

  viewChange = () => {
    this.setState({
      view: !this.state.view
    })
  }

  getObjects = () => {
    this.props.socket.emit('fetchEvents', (data) => {
      if (data.err) {
        return alert(data)
      } else {
        this.setState({
          events: data.filtered
        })
      }
    })
  }

  sendData = (eventId) => {
    this.setState({
      idBeingDeleted: eventId
    })
  }

  deleteDrop = (eventId) => {
    this.props.socket.emit('deleteEvent', {id: eventId}, (data) => {
        if (data.err) {
          console.log('Uh Oh, DeleteDrop Is Fucking Up')
        } else {
          this.getObjects()
        }
    });
  };


  openEvent = (eventId) => {
    this.props.socket.emit('joinRoom', {eventId: eventId}, (data) => {
      if (data) {
        this.setState({
          openEvent: true,
          eventId: eventId
        })
      }
    })
  }

  render() {

    //This is to switch views from Calendar to Scroller
    let viewRender
    if (!this.state.view) {
      viewRender = (
        <div className="scrolling-events">
          <ScrollerView
            events={this.state.events}
            getObjects={this.getObjects}
            socket={this.props.socket}
            sendData={this.sendData}
            deleteId={this.state.idBeingDeleted}
            openEvent={this.openEvent}
          />
        </div>)
    } else {
      viewRender = (
        <div className="calendar">
          <CalendarView />
        </div>)
    }

    //This is to open an actual event
    let eventRender
    if (!this.state.openEvent) {
      eventRender = (
        <div>
          <span className="greetings"> Welcome Krish </span>
          <span className="viewSwitch">
            <Toggle
              defaultChecked={this.state.view}
              icons={{
                checked: <span> Calendar </span>,
                unchecked: <span> Card </span>
              }}
              onChange={this.viewChange}
            />
          </span>
          {viewRender}
          <div className="addIcon">
            <AddEventModal getObjects={this.getObjects}/>
          </div>

          <Droppable type={['event']} className="trashIcon" onDrop={() => this.deleteDrop(this.state.idBeingDeleted)}>
            <Icon inverted color='grey' name='trash alternate' size="big" />
          </Droppable>
        </div>
      )
    } else {
      eventRender = (
        <Event eventId={this.state.eventId} socket={this.props.socket}/>
      )
    }


    return (
      <div className="dashboard">
        {eventRender}
      </div>
    )
  }
};

export default UserDash
