import React, { Component } from 'react'
import {Tab, Divider, Header } from 'semantic-ui-react'
import Invitees from './Invitees/Invitees'
import AddGuestModal from '../../Modals/AddGuestModal'
import SendMultipleModal from '../../Modals/SendMultipleModal'
import Specials from './Specials/Specials'
import Collaborator from './Collaborator/Collaborator'
import AddSpecialModal from '../../Modals/AddSpecialModal'
import ShareEventModal from '../../Modals/ShareEventModal'
import './People.css'

export default class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guestsList: [],
      emailList: [],
      filteredGuestsList: [],
      specialsList: [],
      filteredSpecialsList: [],
      collaboratorList: [],
      filteredCollaboratorList: [],

    }
  }

  componentDidMount() {
    this.props.socket.emit('getPeople', {eventId: this.props.eventId})
    this.props.socket.on('sendPeople', (data) => {
      this.setState({guestsList: data.guestList, filteredGuestsList: data.guestList, specialsList: data.catererList, filteredSpecialsList: data.catererList, collaboratorList: data.collaboratorList, filteredCollaboratorList: data.collaboratorList})
    })
    this.props.socket.on('updatedPeople', (data) => {
      this.setState({guestsList: data.guestList, filteredGuestsList: data.guestList})
    })
    this.props.socket.on('updatedCaterer', (data) => {
      this.setState({specialsList: data.catererList, filteredSpecialsList: data.catererList})
    })
    this.props.socket.on('updatedTeam', (data) => {
      this.setState({collaboratorList: data.team, filteredCollaboratorList: data.team})
    })
  }

  componentWillUnmount() {
    this.props.socket.removeListener('sendPeople')
    this.props.socket.removeListener('updatedPeople')
    this.props.socket.removeListener('updatedCaterer')
    this.props.socket.removeListener('getPeople')
    this.props.socket.removeListener('updatedTeam')
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

  filteredCaterer = async (val) => {
    let filteredList = []
    this.state.specialsList.map((caterer) => {
      if (caterer.name.includes(val) || caterer.phone.includes(val) || caterer.email.includes(val) || caterer.status.includes(val) || caterer.notes.includes(val)) {
        filteredList.push(caterer)
      }
    })
    if (val === '') {
      filteredList = this.state.specialsList
    }
    await this.setState({filteredSpecialsList: filteredList})
  }

  filteredTeam = async (val) => {
    let filteredList = []
    this.state.collaboratorList.map((collab) => {
      if (collab.name.includes(val) || collab.phone.includes(val) || collab.email.includes(val) || collab.notes.includes(val) || collab.role.includes(val)) {
        filteredList.push(collab)
      }
    })
    if (val === '') {
      filteredList = this.state.collaboratorList
    }
    await this.setState({filteredCollaboratorList: filteredList})
  }



  sendEmailsBack = (emailList) => {
    this.setState({emailList: emailList})
  }

  render() {
    let panes = [
      { menuItem: 'Invitees', render: () =>
      <Tab.Pane className='word'>
        <div>
          <Invitees socket={this.props.socket} filteredList={this.filteredList} eventId={this.props.eventId} sendEmailsBack={this.sendEmailsBack} guestsList={this.state.filteredGuestsList}/>
          <AddGuestModal socket={this.props.socket} eventId={this.props.eventId} />
          <SendMultipleModal socket={this.props.socket} eventId={this.props.eventId} emailList={this.state.emailList} />
        </div>
      </Tab.Pane> },
      { menuItem: 'VIP / Entertainers', render: () =>
      <Tab.Pane>
        <div>
          <Specials socket={this.props.socket} filteredList={this.filteredCaterer} eventId={this.props.eventId} specialsList={this.state.filteredSpecialsList}/>
          <AddSpecialModal socket={this.props.socket} eventId={this.props.eventId} />
        </div>
      </Tab.Pane>},
      { menuItem: 'Collaborators', render: () =>
      <Tab.Pane>
        <div>
          <Collaborator socket={this.props.socket} filteredList={this.filteredTeam} eventId={this.props.eventId} collaboratorList={this.state.filteredCollaboratorList}/>
          <ShareEventModal socket={this.props.socket} eventId={this.props.eventId}/>
        </div>
      </Tab.Pane>}
    ]
    return (
      <div>
        <Header as='h1'>People</Header>
        <Divider />
        <Tab panes={panes} />
      </div>


    )
  }
}
