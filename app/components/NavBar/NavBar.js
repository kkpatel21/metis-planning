import React, { Component } from 'react';
import { Menu, Input, Dropdown, Form} from 'semantic-ui-react'
import './NavBar.css';
import GiveFeedbackModal from '../Modals/GiveFeedbackModal'

class UserDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'goHome'
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name})

  goHome = () => {
    this.props.socket.emit('goHome')
  }

  render() {
    return (
      <div className="navBar">
        <Menu>
          <Menu.Item name='go home' active={this.state.activeItem === 'goHome'} onClick={this.goHome} />
          <Menu.Menu position='right'>
            <GiveFeedbackModal />
            <Menu.Item name='logout' active={this.state.activeItem === 'logout'} onClick={this.props.toggleLogged} />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
};


export default UserDash;
