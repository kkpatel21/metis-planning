import React, { Component } from "react";
import {
  Input,
  Button,
  List,
  Icon,
  Divider,
  Header,
  Segment,
  Tab,
  Label
} from "semantic-ui-react";
import "./Logistics.css";
import AddVenueModal from "../../Modals/AddVenueModal";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import AddLogisticsTab from '../../Modals/AddLogisticsTab'
import Venue from './Venue.js'

export default class Logistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTab: [
        { menuItem: {key: 'addTab', content: <AddLogisticsTab eventId={this.props.eventId} socket={this.props.socket}/>},
          render: () => <Tab.Pane><div className='addTab'>Add Your Venue/Caterer</div></Tab.Pane>}
      ],
      allTabs: []
    };
  }

  deleteTab = (index) => {
    this.props.socket.emit('deleteLogisticsTab', {eventId: this.props.eventId, index: index})
  }
  componentDidMount = () => {
    this.props.socket.emit('getLogisticsTabs', {eventId: this.props.eventId})
    this.props.socket.on('sendLogisticsTabs', data => {
      let newTabs = data.tabs.map((tab, i) => {
        let fundRender;
        if (tab.vORp === 'caterer') {
          fundRender = (
            <div>
              Render People
            </div>
          )
        } else {
          fundRender = (
            <div>
              <Venue socket={this.props.socket} eventId={this.props.eventId} index={i}/>
            </div>
          )
        }
        return {
          menuItem: {key: i, content: <Header as='h4'><Header.Content>{tab.title} &emsp; <Icon color='grey' name='cancel' onClick={() => this.deleteTab(i)} /></Header.Content></Header>},
          render: () => <Tab.Pane>{fundRender}</Tab.Pane>
        }
      })
      newTabs = newTabs.concat(this.state.addTab)
      this.setState({
        allTabs: newTabs
      })
    })

    this.props.socket.on('addLogisticsTab', data => {
      let updateTabs = this.state.allTabs.slice()
      let add = updateTabs.pop()
      let addRender;
      if (data.newTab.vORp === 'caterer') {
        addRender = (
          <div>
            Render People
          </div>
        )
      } else {
        addRender = (
          <Venue eventId={this.props.eventId} socket={this.props.socket} index={(updateTabs.length-2)}/>
        )
      }
      updateTabs.push({
        menuItem: {key: data.newTab.title, content: <Header as='h4'><Header.Content>{data.newTab.title} &emsp;<Icon color='grey' name='cancel' onClick={() => this.deleteTab(updateTabs.length-2)} /> </Header.Content></Header>},
        render: () => <Tab.Pane>{addRender}</Tab.Pane>
      })
      updateTabs.push(add)
      this.setState({
        allTabs: updateTabs
      })
    })
  };

  componentWillUnmount() {
    this.props.socket.removeListener('sendLogisticsTabs')
    this.props.socket.removeListener('addLogisticsTab')
    this.props.socket.removeListener('deleteLogisticsTab')
    this.props.socket.removeListener('getLogisticsTabs')
  }


  render() {
    return (
      <div>
        <div>
          <Header as='h1'>Logistics</Header>
          <Divider />
        </div>
      <Tab panes={this.state.allTabs} />
      </div>
    )
  }
}
// const MyMapComponent = withGoogleMap(props => (
//   <GoogleMap
//     defaultZoom={13}
//     defaultCenter={{ lat: props.lat, lng: props.long }}
//   >
//     {props.isMarkerShown && (
//       <Marker position={{ lat: props.lat, lng: props.long }} />
//     )}
//   </GoogleMap>
// ));
