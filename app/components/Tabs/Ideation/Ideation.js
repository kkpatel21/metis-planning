import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';

const panes = [
  { menuItem: 'Tab 1', pane: (<div>hi</div>) },
  { menuItem: 'Tab 2', pane: 'Tab 2 Content' },
  { menuItem: 'Tab 3', pane: 'Tab 3 Content' },
]



export default class Ideation extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
      <Tab panes={panes} renderActiveOnly={false} />
        <h1>IDEATION</h1>

      </div>
    )
  }
}
