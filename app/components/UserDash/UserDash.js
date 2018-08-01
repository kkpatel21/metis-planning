import React, { Component } from 'react';
import { Menu, Input} from 'semantic-ui-react'
import './UserDash.css';

class UserDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div className="dashboard">
        <span className="greetings"> Good Evening ~Add Name Here~ </span>
      </div>
    )
  }
};


export default UserDash;
