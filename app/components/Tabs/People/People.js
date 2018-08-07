import React, { Component } from 'react'
import { List, Icon, Button } from 'semantic-ui-react'

export default class People extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="guestList">
        <List divided verticalAlign="middle">
          <List.Item verticalAlign='middle'>
            <List.Content verticalAlign="middle" floated='right'>
              <Button> Email </Button>
            </List.Content>
            <Icon name="user" />
            <List.Content verticalAlign="middle"> Krish </List.Content>
          </List.Item>
          <List.Item>
            <List.Content verticalAlign="middle" floated='right'>
              <Icon name="mail" />
            </List.Content>
            <Icon name="user" />
            <List.Content verticalAlign="middle"> Ellie </List.Content>
          </List.Item>
        </List>
      </div>
    )
  }
}
