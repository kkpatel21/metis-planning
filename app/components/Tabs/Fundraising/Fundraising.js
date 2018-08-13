import React, { Component } from 'react'
import { List, Label, Tab, Icon, Header } from 'semantic-ui-react'
import AddNewTab from '../../Modals/AddNewTab'
import './Fundraising.css'

export default class Fundraising extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTab: [
        { menuItem: {key: 'addTab', content:<AddNewTab eventId={this.props.eventId} socket={this.props.socket}/>},
          render: () => <div>Add A New Table</div>}
      ],
      allTabs: []
    }
  }

  deleteTab = (index) => {
    this.props.socket.emit('deleteTab', {eventId: this.props.eventId, index: index})
  }

  componentDidMount() {
    this.props.socket.emit('getTabs', {eventId: this.props.eventId})
    this.props.socket.on('sendTabs', data => {
      let newTabs = data.tabs.map((tab, i) => {
        return {
          menuItem: {key: i, content:<Header as='h4'><Header.Content>{tab.title} &emsp;<Icon color='grey' name='cancel' onClick={() => this.deleteTab(i)}/></Header.Content></Header>},
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
