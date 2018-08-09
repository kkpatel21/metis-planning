import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import Notepad from "./Notepad/Notepad";
import TodoApp from './Todo/Todo';






export default class Ideation extends React.Component {
  constructor() {
    super();
    this.state={
    }
  }
  componentDidMount(){
    console.log("in ideation --------> ",this.props.eventId)
  }

  render() {
    const panes = [
      { menuItem: 'Venue', render: () => <Tab.Pane><div><Notepad socket={this.props.socket} eventId={this.props.eventId}/></div></Tab.Pane> },
      { menuItem: 'Caterer', render: () => <Tab.Pane>Caterer</Tab.Pane> },
      { menuItem: 'Speaker', render: () => <Tab.Pane>Speaker!</Tab.Pane> },
      { menuItem: "Activities", render: () => <Tab.Pane> Activities brainstorming </Tab.Pane> },
    ]
    return (
      <div>
      <Tab panes={panes} />


      </div>
    )
  }
}
