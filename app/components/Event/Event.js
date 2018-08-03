import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'

export default class Event extends React.Component {
    constructor(){
        super();
        this.state={activeItem:"Dashboard"}
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
      const { activeItem } = this.state
  
      return (
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
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
            </Menu>
          </Grid.Column>
  
          <Grid.Column stretched width={12}>
            <Segment>
             
            </Segment>
          </Grid.Column>
        </Grid>
      )
    }
}