import React, { Component } from 'react';
import { Table, Menu, Dropdown, Input, Label, Progress, Header, Icon, Divider, Button } from 'semantic-ui-react';
import './Budget.css';
import UpdateBudgetLineItemModal from '../../Modals/UpdateBudgetLineItemModal.js'

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
      amount: "",
      totalBudget: 0,
      editTotalBudget: false,
      approval:'',
      totalApproval:''
    }
  }

  componentDidMount() {
    this.props.socket.emit('getBudget', {eventId: this.props.eventId})
    this.props.socket.on('updatedBudget', (data) => {
      if(data.budget.total !== 0) {
        this.setState({editTotalBudget: true})
      }
      //this lags
      budgetList = data.budget.budgetItems
      this.setState({
        totalBudget: data.budget.total,
        totalApproval: data.budget.totalApproval
      })
    })
  }

  onClick = async () => {
    if(this.state.amount === "") {
      await this.setState({amount: 0})
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

  handleKeyPress = async (event) => {
    if(event.key === 'Enter') {
      if(this.state.amount === "") {
        await this.setState({amount: 0})
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

  deleteLineItem = (index) => {
    this.props.socket.emit('deleteLineItem', {eventId: this.props.eventId, index: index})
  }

  handleNewTotal = (event) => {
    if(event.key === 'Enter') {
      this.setState({editTotalBudget: !this.state.editTotalBudget})
      this.props.socket.emit('updateTotalBudget', {eventId: this.props.eventId, totalBudget: this.state.totalBudget})
    }
  }

  onTrigger = () => {
    this.setState({editTotalBudget: !this.state.editTotalBudget})
  }

  totalApprovalChange = (event, value) => {
    this.props.socket.emit('totalApproval', {eventId: this.props.eventId, totalApproval: value.value})
    this.props.socket.on('updatedBudget', (data) => {
      this.setState({
        totalApproval: data.budget.totalApproval
      })
    })
  }

  render() {
    const value = this.state.approval
    const totalValue = this.state.totalApproval
    let allocated = 0
    budgetList.forEach((item) => {
      console.log(item.amount)
      allocated+=parseInt(item.amount)
    })
    let percent = parseInt(allocated/this.state.totalBudget*100)

    return (
      <div>
                <Header as='h1'>Event Budget</Header>
        <Divider />
        {percent > 100 ?
          <Progress percent={percent} progress error />
          :
          <Progress percent={percent} progress inverted color='blue'/>
        }
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
              <Table.HeaderCell>

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
                    onChange={(e) => this.setState({lineItem: e.target.value})}
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
                <Table.Cell>
                  <Button icon onClick={this.onClick}>
                    <Icon name='add square' />
                  </Button>
                </Table.Cell>
              </Table.Row>

              {budgetList.map((item, index) =>
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
                  <Table.Cell>
                    <span>
                      <UpdateBudgetLineItemModal socket={this.props.socket} lineItem={item} i={index} eventId={this.props.eventId}/>
                      <Icon name='trash' onClick={() => this.deleteLineItem(index)}/>
                    </span>
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
                  {this.state.editTotalBudget === false ?
                    <span>
                      <Input
                        labelPosition='right'
                        type='number'
                        placeholder='Total Amount'
                        onKeyPress={this.handleNewTotal}
                        onChange={e => this.setState({totalBudget: e.target.value})}
                        value={this.state.totalBudget}
                        >
                          <Label basic>$</Label>
                          <input />
                        </Input>
                      </span>
                    :
                    <div className='summation'>
                      ${this.state.totalBudget}
                      <div className='editTotalIcon'>
                        <Icon name='pencil' onClick={() => this.onTrigger()}/>
                      </div>
                    </div>
                  }
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
