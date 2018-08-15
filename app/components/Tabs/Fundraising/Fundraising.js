import React, { Component } from 'react'
import { List, Label, Tab, Icon, Header, Divider } from 'semantic-ui-react'
import AddNewTab from '../../Modals/AddNewTab'
import './Fundraising.css'
import FundingStats from './FundingStats.js'
import EditTabModal from '../../Modals/EditTabModal'

export default class Fundraising extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTab: [
        { menuItem: {key: 'addTab', content:<AddNewTab eventId={this.props.eventId} socket={this.props.socket}/>},
          render: () => <Tab.Pane><div className='addTab'>Add A New Table</div></Tab.Pane>}
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
          menuItem: {key: i, content:<Header as='h4'><Header.Content>{tab.title} &emsp;<EditTabModal socket={this.props.socket} title={tab.title} goal={tab.goal} eventId={this.props.eventId} index={i}/><Icon color='grey' name='cancel' onClick={() => this.deleteTab(i)}/></Header.Content></Header>},
          render: () => <Tab.Pane> <FundingStats goal={tab.goal} key={i} title={tab.title} socket={this.props.socket} eventId={this.props.eventId} index={i}/> </Tab.Pane>
        }
      })
      newTabs = newTabs.concat(this.state.addTab)
      this.setState({
        allTabs: newTabs
      })
    })
    this.props.socket.on('addTab', data => {
      let updateTabs = this.state.allTabs.slice()
      let add = updateTabs.pop()
      updateTabs.push({
        menuItem: {key: data.newTab.title, content: <Header as='h4'><Header.Content>{data.newTab.title} &emsp;<Icon color='grey' name='cancel' onClick={() => this.deleteTab(updateTabs.length-2)}/></Header.Content></Header>},
        render: () => <Tab.Pane> <FundingStats goal={data.newTab.goal} key={updateTabs.length-2} title={data.newTab.title} socket={this.props.socket} eventId={this.props.eventId} index={updateTabs.length-2}/> </Tab.Pane>
      })
      updateTabs.push(add)
      this.setState({
        allTabs: updateTabs
      })
    })
  }

  componentWillUnmount() {
    this.props.socket.removeListener('sendTabs')
    this.props.socket.removeListener('addTab')
  }

  render() {
    return(
      <div>
        <div>
        <Header as='h1'>Fundraising</Header>
        <Divider />
        </div>
      <Tab panes={this.state.allTabs} />
      </div>
    )
  }
}
