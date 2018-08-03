import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import Notepad from "./notepad/notepad";

const panes = [
<<<<<<< HEAD
  { menuItem: 'Tab 1', pane: (<div>hi</div>) },
  { menuItem: 'Tab 2', pane: 'Tab 2 Content' },
  { menuItem: 'Tab 3', pane: 'Tab 3 Content' },
=======
  { menuItem: 'Venue', render: () => <Tab.Pane><div>HELLO</div></Tab.Pane> },
  { menuItem: 'Caterer', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Speaker', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
>>>>>>> 4081bbaf9e30c1026076ec08ef997147a1930b76
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
