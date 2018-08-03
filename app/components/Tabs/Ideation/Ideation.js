import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import Notepad from "./notepad/notepad";

const panes = [
  { menuItem: 'Venue', render: () => <Tab.Pane><div>HELLO</div></Tab.Pane> },
  { menuItem: 'Caterer', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Speaker', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]




export default class Ideation extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
      <Tab panes={panes} />


      </div>
    )
  }
}
