import React, { Component } from 'react'
import { List, Icon } from 'semantic-ui-react'

export default class People extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="guestList">
        <List>
          <List.Item>
            <Icon name="user" />
          </List.Item>
        </List>
      </div>
    )
  }
}
