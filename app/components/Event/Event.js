import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import People from '../Tabs/People/People'
import Ideation from '../Tabs/Ideation/Ideation'
import Budget from '../Tabs/Budget/Budget'
import Overview from '../Tabs/Overview/Overview'

export default class Event extends React.Component {
    constructor(){
        super();
        this.state={activeItem:"Dashboard"}
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
      const { activeItem } = this.state
      let tabRender;
      if (activeItem === 'People') {
        tabRender = (<People socket={this.props.socket} eventId={this.props.eventId}/>)
      } else if (activeItem === 'Ideation'){
        tabRender = (<Ideation socket={this.props.socket} eventId={this.props.eventId} />)
      } else if (activeItem === 'Budget'){
        tabRender = (<Budget socket={this.props.socket} eventId={this.props.eventId} />)
      } else {
        tabRender = (<Overview socket={this.props.socket} eventId={this.props.eventId}/>)
      }
      return (
        <Grid>
          <Grid.Column width={2}>
            <Menu fluid vertical pointing tabular>
              <Menu.Item name='Dashboard' active={activeItem === 'Dashboard'} onClick={this.handleItemClick} />
              <Menu.Item name='People' active={activeItem === 'People'} onClick={this.handleItemClick} />
              <Menu.Item
                name='Ideation'
                active={activeItem === 'Ideation'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Budget'
                active={activeItem === 'Budget'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Logistics'
                active={activeItem === 'Logistics'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Tickets'
                active={activeItem === 'Tickets'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={14} >
            <Segment>
              {tabRender}
            </Segment>
          </Grid.Column>
        </Grid>
      )
    }
}
