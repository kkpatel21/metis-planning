import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import Notepad from "./Notepad/Notepad";

export default class Ideation extends React.Component {
  constructor() {
    super();
    this.state={
    }
  }

  render() {
    const panes = [
      { menuItem: 'Venue', render: () => <Tab.Pane><div><Notepad eventId={this.props.eventId}/></div></Tab.Pane> },
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
