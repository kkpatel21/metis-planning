import React, { Component } from 'react';
import { Table, Menu, Dropdown, Input, Label, Progress, Header } from 'semantic-ui-react';
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
      totalBudget: '',
      approval:'',
      totalApproval:''
    }
  }

  componentDidMount() {
    this.props.socket.emit('getBudget', {eventId: this.props.eventId}, res => {
      budgetList = res.event.budget.budgetItems
      this.setState({
        totalApproval: res.event.budget.totalApproval
      })
    })
  }

  addLineItem = (e) => {
    this.setState({lineItem: e.target.value})
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      if(this.state.amount === '') {
        budgetList.push({lineItem: this.state.lineItem, amount: 0, approval: this.state.approval})
      } else {
        budgetList.push({lineItem: this.state.lineItem, amount: this.state.amount, approval: this.state.approval})
      }
      let budgetItem = {
        lineItem: this.state.lineItem,
        amount: this.state.amount,
        approval: this.state.approval
      }
      this.props.socket.emit('addLineItem', {eventId: this.props.eventId, budgetItems: budgetItem})
      this.setState({
        lineItem: '',
        amount: '',
        approval: ''
      })
    }
  }

  totalApprovalChange = (event, value) => {
    this.props.socket.emit('totalApproval', {eventId: this.props.eventId, totalApproval: value.value})
    this.setState({
      totalApproval: value.value
    })
  }

  render() {
    const value = this.state.approval
    const totalValue = this.state.totalApproval
    let totalBudget = 5000
    let allocated = 0
    budgetList.forEach((item) => {
      allocated+=parseInt(item.amount)
    })
    let percent = parseInt(allocated/totalBudget*100)

    return (
      <div>
        {percent > 100 ?
          <Progress percent={percent} progress error />
          :
          <Progress percent={percent} progress inverted color='blue'/>
        }
        <Header as='h1'>Event Budget</Header>
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
                  </span>
                </Table.Cell>
              </Table.Row>

              {budgetList.map((item) =>
                <Table.Row>
                  <Table.Cell>
                    {item.lineItem}
                  </Table.Cell>
                  <Table.Cell>
                    ${item.amount}
                  </Table.Cell>
                  <Table.Cell>
                    {item.approval}
                  </Table.Cell>
                </Table.Row>
              )}

              <Table.Row>
                <Table.Cell>
                  <span className='summation'>Allocated</span>
                </Table.Cell>
                <Table.Cell>
                  <span className='summation'>${allocated}</span>
                </Table.Cell>
                <Table.Cell>
                  <span></span>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <div className='summation'>Total</div>
                </Table.Cell>
                <Table.Cell>
                  <div className='summation'>${totalBudget}</div>
                </Table.Cell>
                <Table.Cell>
                  <div>
                    <Menu compact>
                      <Dropdown
                        onChange={(e, value) => this.totalApprovalChange(e, value)}
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
