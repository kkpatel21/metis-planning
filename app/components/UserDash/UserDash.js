import React, { Component } from 'react';
import { Menu, Input, Table, Icon, Label} from 'semantic-ui-react'
import './UserDash.css';
import CalendarView from './CalendarView'

class UserDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <div>
        <div className="dashboard">
          <span className="greetings"> Good Evening ~Add Name Here~ </span>
        </div>
        <CalendarView />
      </div>
    )
  }
};

export default UserDash
