import React, { Component } from 'react';
import { Table, Menu, Dropdown, Input, Label, Progress } from 'semantic-ui-react';
import './Budget.css';

const options = [
  { key: 'y', text: 'Yes', value: 'Yes'},
  { key: 'p', text: 'Pending', value: 'Pending'},
  { key: 'n', text: 'No', value: 'No'},
]

export default class Budget extends React.Component {
  constructor() {
    super()
    this.state = {
      lineItem: '',
      amount: '',
      approval:'',
      totalBudget: 5000,
      totalApproval:''
    }
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      console.log('pressed')
    }
  }

  render() {
    const value = this.state.approval
    const totalValue = this.state.totalApproval
    return (
      <Progress percent={44} progress />
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Line Item
              </Table.HeaderCell>
              <Table.HeaderCell>
                Amount
              </Table.HeaderCell>
              <Table.HeaderCell>
                Approval
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <span>
                  <Input
                    placeholder='New Line Item'
                    type='text'
                    onChange={e => this.setState({lineItem: e.target.value})}
                  />
                  <div>{this.state.lineItem}</div>
                </span>
              </Table.Cell>
              <Table.Cell>
                <span>
                  <Input
                    labelPosition='right'
                    type='number'
                    placeholder='Amount'
                    onChange={e => this.setState({amount: e.target.value})}>
                    <Label basic>$</Label>
                    <input />
                  </Input>
                  <div>{this.state.amount}</div>
                </span>
              </Table.Cell>
              <Table.Cell>
                <span>
                  <Menu compact>
                    <Dropdown
                      onChange={(e,value) => {this.setState({approval: value.value})}}
                      placeholder='Approved?'
                      selection
                      options={options}
                      value={value}
                    />
                  </Menu>
                  <div>{this.state.approval}</div>
                </span>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <span>Allocated</span>
                <div>Total</div>
              </Table.Cell>
              <Table.Cell>
                <span></span>
                <div></div>
              </Table.Cell>
              <Table.Cell>
                <span></span>
                <div>
                  <Menu compact>
                    <Dropdown
                      onChange={(e,value) => {this.setState({totalApproval: value.value})}}
                      placeholder='Approved?'
                      selection
                      options={options}
                      value={totalValue}
                    />
                  </Menu>
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
}
