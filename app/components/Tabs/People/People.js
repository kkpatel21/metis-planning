import React, { Component } from 'react'
import {Tab } from 'semantic-ui-react'
import Invitees from './Invitees/Invitees'
import AddGuestModal from '../../Modals/AddGuestModal'
import SendMultipleModal from '../../Modals/SendMultipleModal'

export default class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guestsList: [],
      emailList: [],
    }
  }

  componentDidMount() {
    this.props.socket.emit('getPeople', {eventId: this.props.eventId})
    this.props.socket.on('sendPeople', (data) => {
      this.setState({guestsList: data.guestList})
    })
    this.props.socket.on('updatedPeople', (data) => {
      this.setState({guestsList: data.guestList})
    })
  }

  sendEmailsBack = (emailList) => {
    this.setState({emailList: emailList})
  }

  render() {
    let panes = [
      { menuItem: 'Invitees', render: () =>
      <Tab.Pane>
        <div>
          <Invitees socket={this.props.socket} eventId={this.props.eventId} sendEmailsBack={this.sendEmailsBack} sendDataBack={this.sendDataBack} guestsList={this.state.guestsList}/>
          <AddGuestModal socket={this.props.socket} eventId={this.props.eventId} sendDataBack={this.sendDataBack} />
          <SendMultipleModal socket={this.props.socket} eventId={this.props.eventId} emailList={this.state.emailList} />
        </div>
      </Tab.Pane> },
      { menuItem: 'Special Guests', render: () =>
      <Tab.Pane>
        Guest should be here
      </Tab.Pane>},
      { menuItem: 'Team', render: () =>
      <Tab.Pane>
        Dream Team!
      </Tab.Pane>}
    ]
    return (
      <div>
        <Tab panes={panes} />
      </div>


    )
  }
}
