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
      cards: false,
      idBeingDeleted: "",
      openEvent: false,
      eventId: "",
    };
  }


  viewChange = () => {
    this.setState({
      view: !this.state.view
    })
  }

  updateCards = () => {
    this.setState({
      cards: !this.state.cards
    })
  }

  sendData = (eventId) => {
    this.setState({
      idBeingDeleted: eventId
    })
  }

  deleteDrop = (eventId) => {
    this.props.socket.emit('deleteEvent', {id: eventId}, (res) => {
        if (res.err) {
          return alert(res)
        } else {
          this.updateCards()
        }
    });
  }
  //
  //   if(!err)
  //   fetch("/api/deleteEvent", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type' : 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id: eventId
  //     })
  //   })
  //   .then((res) => {
  //     if (res.status === 200) {
  //       this.updateCards()
  //     }
  //   })
  //   .catch(err => {
  //     alert("Error: " + err)
  //   })
  // }

  openEvent = (eventId) => {
    this.setState({
      openEvent: true,
      eventId: eventId
    })
  }

  render() {

    //This is to switch views from Calendar to Scroller
    let viewRender
    if (!this.state.view) {
      viewRender = (
        <div className="scrolling-events">
          <ScrollerView
            socket={this.props.socket}
            updateCards={this.updateCards}
            cards={this.state.cards}
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
            <AddEventModal updateCards={this.updateCards}/>
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
