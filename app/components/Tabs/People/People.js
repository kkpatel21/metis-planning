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
    fetch(`/api/getPeople/${this.props.eventId}`)
    .then(res => res.json())
    .then(json => {
      this.setState({ guestsList: json})
    })
  }

  saveUpdatedData = (guestList) => {
    fetch(`/api/savePeople/${this.props.eventId}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guests: guestList
      })
    })
    .then(res => res.json())
    .then(json => {
      this.setState({guestsList: json.people})
    })

  }

  sendDataBack = (guestList) => {
    this.setState({
      guestsList: guestList
    })
  }

  sendEmailsBack = (emailList) => {
    this.setState({
      emailList: emailList
    })
  }

  handleMultipleEmail = (email, subject, message) => {
    fetch('/api/sendMultipleEmails', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        to: email,
        subject: subject,
        message: message
      })
    })
  }

  render() {
    console.log(this.state.guestsList)
    console.log(this.state.emailList)
    let panes = [
      { menuItem: 'Invitees', render: () =>
      <Tab.Pane>
        <div>
          <Invitees eventId={this.props.eventId} saveUpdatedData={this.saveUpdatedData} sendEmailsBack={this.sendEmailsBack} sendDataBack={this.sendDataBack} guestsList={this.state.guestsList}/>
          <AddGuestModal eventId={this.props.eventId} sendDataBack={this.sendDataBack} />
          <SendMultipleModal eventId={this.props.eventId} emailList={this.state.emailList} handleMultipleEmail={this.handleMultipleEmail}/>
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
