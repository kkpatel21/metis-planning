import React, { Component } from 'react';
import { Table, Menu, Dropdown, Input, Label, Progress } from 'semantic-ui-react';
import './Budget.css';

const options = [
  { key: 'y', text: 'Yes', value: 'Yes'},
  { key: 'p', text: 'Pending', value: 'Pending'},
  { key: 'n', text: 'No', value: 'No'},
]
let budgetList = [];


export default class Budget extends React.Component {
  constructor() {
    super()
    this.state = {
      lineItem: '',
      amount: '',
      approval:'',
      totalApproval:''
    }
  }

  addLineItem = (e) => {
    this.setState({lineItem: e.target.value})
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      budgetList.push({lineItem: this.state.lineItem, amount: this.state.amount, approval: this.state.approval}),
      this.setState({
        lineItem: '',
        amount: '',
        approval: ''
      })
    }
  }

  render() {
    const value = this.state.approval
    const totalValue = this.state.totalApproval
    let totalBudget = 5000
    let allocated = 0
    budgetList.forEach((item) => {
      allocated+=parseInt(item.amount)
    })

    return (
      <div>
        <Progress percent={parseInt(allocated/totalBudget*100)} progress />
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
                    onKeyPress={this.handleKeyPress}
                    onChange={this.addLineItem}
                    value={this.state.lineItem}
                  />
                  {budgetList.map((item) => <div>{item.lineItem}</div>)}
                </span>
              </Table.Cell>
              <Table.Cell>
                <span>
                  <Input
                    labelPosition='right'
                    type='number'
                    placeholder='Amount'
                    onKeyPress={this.handleKeyPress}
                    onChange={e => this.setState({amount: e.target.value})}
                    value={this.state.amount}
                    >
                      <Label basic>$</Label>
                      <input />
                    </Input>
                    {budgetList.map((item) => {
                      console.log(item.amount)
                      if(item.amount === '') {
                        <div>$0</div>
                      } else {
                        <div>${item.amount}</div>
                      }
                    })}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span>
                    <Menu compact>
                      <Dropdown
                        onKeyPress={this.handleKeyPress}
                        onChange={(e,value) => {this.setState({approval: value.value})}}
                        placeholder='Approved?'
                        selection
                        options={options}
                        value={value}
                      />
                    </Menu>
                    {budgetList.map((item) => <div>{item.approval}</div>)}
                  </span>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <span>Allocated</span>
                </Table.Cell>
                <Table.Cell>
                  <span>${allocated}</span>
                </Table.Cell>
                <Table.Cell>
                  <span></span>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <div>Total</div>
                </Table.Cell>
                <Table.Cell>
                  <div>${totalBudget}</div>
                </Table.Cell>
                <Table.Cell>
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
