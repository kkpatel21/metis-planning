import React, { Component } from 'react';
import { Menu, Input, Dropdown, Form} from 'semantic-ui-react'
import './NavBar.css';
import GiveFeedbackModal from '../Modals/GiveFeedbackModal'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'goHome',
      name: ''
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name})

  goHome = () => {
    this.props.socket.emit('goHome')
  }

  componentDidMount() {
    this.props.socket.emit('getName')
    this.props.socket.on('getName', (data) => {
      this.setState({name: 'Welcome' + data.name})
    })
  }

  render() {
    return (
      <div className="navBar">
        <Menu>
          <Menu.Item name='Home' active={this.state.activeItem === 'goHome'} onClick={this.goHome} />
          <Menu.Item name='About Us' active={this.state.activeItem === 'aboutUs'} />
          <Menu.Menu position='left'>
            <Menu.Item name={this.state.name} />
          </Menu.Menu>
          <Menu.Menu position='right'>
            <GiveFeedbackModal />
            <Menu.Item name='logout' active={this.state.activeItem === 'logout'} onClick={this.props.toggleLogged} />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
};


export default NavBar;
