import React, { Component } from 'react';
import { Menu, Input, Table, Icon, Label} from 'semantic-ui-react'
import './ScrollerView.css'

class ScrollerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div class="card">
          <h2>Card</h2>
        </div>
        <div class="card">
          <h2>Card</h2>
        </div>
        <div class="card">
          <h2>Card</h2>
        </div>
        <div class="card">
          <h2>Card</h2>
        </div>
        <div class="card">
          <h2>Card</h2>
        </div>
        <div class="card">
          <h2>Card</h2>
        </div>
        <div class="card">
          <h2>Card</h2>
        </div>
        <div class="card">
          <h2>Card</h2>
        </div>
        <div class="card">
          <h2>Card</h2>
        </div>
        <div class="card">
          <h2>Card</h2>
        </div>
      </div>
    )
  }
};

export default ScrollerView
