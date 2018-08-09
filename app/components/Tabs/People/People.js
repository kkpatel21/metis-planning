import React, { Component } from 'react'
import {Tab } from 'semantic-ui-react'
import Invitees from './Invitees/Invitees'
import AddGuestModal from '../../Modals/AddGuestModal'
import SendMultipleModal from '../../Modals/SendMultipleModal'
import Specials from './Specials/Specials'

export default class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guestsList: [],
      emailList: [],
      filteredGuestsList: [],
      specialsList: [],
      filteredSpecialsList: [],
    }
  }

  componentDidMount() {
    this.props.socket.emit('getPeople', {eventId: this.props.eventId})
    this.props.socket.on('sendPeople', (data) => {
      this.setState({guestsList: data.guestList, filteredGuestsList: data.guestList})
    })
    this.props.socket.on('updatedPeople', (data) => {
      this.setState({guestsList: data.guestList, filteredGuestsList: data.guestList})
    })
  }

  filteredList = async (val) => {
    let filteredList = []
    this.state.guestsList.map((guest) => {
      if (guest.name.includes(val) || guest.email.includes(val) || guest.status.includes(val) || guest.notes.includes(val)) {
        filteredList.push(guest)
      }
    })
    if (val === '') {
      filteredList = this.state.guestsList
    }
    await this.setState({filteredGuestsList: filteredList})
  }

  sendEmailsBack = (emailList) => {
    this.setState({emailList: emailList})
  }

  render() {
    let panes = [
      { menuItem: 'Invitees', render: () =>
      <Tab.Pane>
        <div>
          <Invitees socket={this.props.socket} filteredList={this.filteredList} eventId={this.props.eventId} sendEmailsBack={this.sendEmailsBack} guestsList={this.state.filteredGuestsList}/>
          <AddGuestModal socket={this.props.socket} eventId={this.props.eventId} sendDataBack={this.sendDataBack} />
          <SendMultipleModal socket={this.props.socket} eventId={this.props.eventId} emailList={this.state.emailList} />
        </div>
      </Tab.Pane> },
      { menuItem: 'Special Guests', render: () =>
      <Tab.Pane>
        <div>
          <Specials socket={this.props.socket} filteredList={this.specialsList} eventId={this.props.eventId} specialsList={this.state.filteredSpecialsList}/>
        </div>
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
