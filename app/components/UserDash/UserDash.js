import React, { Component } from 'react';
import { Menu, Input, Table, Icon, Label} from 'semantic-ui-react'
import './UserDash.css';
import CalendarView from './CalendarView'
import Toggle from 'react-toggle'
import AddEventModal from '../Modals/AddEventModal.js'

class UserDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false
    };
  }


  viewChange = () => {
    this.setState({
      view: !this.state.view
    })
  }

  render() {
    return (
        <CalendarView />
      <div className="dashboard">
        <span className="greetings"> Welcome Krish </span>
        <div className="viewSwitch">
          <Toggle
            defaultChecked={this.state.view}
            icons={{
              checked: <span> Calendar </span>,
              unchecked: <span> Card </span>
            }}
            onChange={this.viewChange}
          />
        </div>

        <div className="events">

        </div>
        <div className="addIcon">
          <AddEventModal />
        </div>
        <div className="trashIcon">
          <Icon inverted color='grey' name='trash alternate' size="big" />
        </div>
      </div>
    )
  }
};

export default UserDash
