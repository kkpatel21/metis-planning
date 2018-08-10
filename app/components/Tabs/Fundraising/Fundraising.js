import React, { Component } from 'react'
import { List, Label, Tab } from 'semantic-ui-react'
import AddNewTab from '../../Modals/AddNewTab'

export default class Fundraising extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTab: [
        { menuItem: {key: 'addTab', content:<AddNewTab eventId={this.props.eventId} socket={this.props.socket}/>},
        }
      ],
      allTabs: []
    }
  }

  componentDidMount() {
    this.props.socket.emit('getTabs', {eventId: this.props.eventId})
    this.props.socket.on('sendTabs', data => {
      let newTabs = data.tabs.map((tab) => {
        return {
          menuItem: {key: tab.title, content:tab.title},
          render: () => <Tab.Pane> Add Another Table </Tab.Pane>
        }
      })
      newTabs = newTabs.concat(this.state.addTab)
      this.setState({
        allTabs: newTabs
      })
    })
    this.props.socket.on('addTab', data => {
      let updateTabs = this.state.allTabs.slice()
      console.log('before', updateTabs)
      let add = updateTabs.pop()
      updateTabs.push({
        menuItem: {key: data.newTab.title, content: data.newTab.title},
        render: () => <Tab.Pane> This Works! </Tab.Pane>
      })
      updateTabs.push(add)
      this.setState({
        allTabs: updateTabs
      })
    })
  }

  render() {
    return(
      <Tab panes={this.state.allTabs} />
    )
  }
}
