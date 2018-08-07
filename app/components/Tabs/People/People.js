import React, { Component } from 'react'
import {Tab } from 'semantic-ui-react'
import Invitees from './Invitees/Invitees'
import './People.css'
import './Invitees/Invitees.css'
import AddGuestModal from '../../Modals/AddGuestModal'

export default class People extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }


  render() {
    const panes = [
      { menuItem: 'Invitees', render: () => <Tab.Pane><div><Invitees eventId={this.props.eventId} /></div></Tab.Pane> },
      { menuItem: 'Special Guests', render: () => <Tab.Pane> Guest should be here </Tab.Pane>},
      { menuItem: 'Team', render: () => <Tab.Pane>Dream Team!</Tab.Pane>}
    ]
    return (
      <div>
        <Tab panes={panes} />
      </div>


    )
  }
}
