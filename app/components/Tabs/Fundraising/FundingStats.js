import React, { Component } from 'react'
import { List, Label, Tab, Table, Input, Header, Icon, Progress } from 'semantic-ui-react'
import UpdateFundModal from '../../Modals/UpdateFundModal.js'

export default class FundingStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineItem: '',
      notes: '',
      amount: '',
      total: '',
      data: [],
      goal: ''

    }
  }

  componentDidMount() {
    this.props.socket.emit('getFundraiser', {index: this.props.index, eventId: this.props.eventId})
    this.props.socket.on('updatedFundraiser', (data) => {
      this.setState({
        data: data.updatedList.data
      })
    })

  }

  componentWillUnmount() {
    this.props.socket.removeListener('updatedFundraiser')
    this.props.socket.removeListener('getFundraiser')
    this.props.socket.removeListener('addToFund')
    this.props.socket.removeListener('deleteFund')
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      let fundraisingItem = {
        lineItem: this.state.lineItem,
        notes: this.state.notes,
        amount: this.state.amount
      }
      this.props.socket.emit('addToFund', {index: this.props.index, eventId: this.props.eventId, fundraisings: this.state.data, addingItem: fundraisingItem})
      this.setState({
        lineItem: '',
        notes: '',
        amount: ''
      })
    }
  }

  deleteFund = (index) => {
    this.props.socket.emit('deleteFund', {i: index, index: this.props.index, eventId: this.props.eventId, fundraisings: this.state.data})
  }

  render() {
    let total = 0;
    this.state.data.forEach(line => {
      total += parseFloat(line.amount)
    })
    let percentage = (total/this.props.goal) * 100
    return(
      <div>
        <Header as='h2'>{this.props.title}</Header>
        <Progress percent={percentage} indicating>Raised ${total} out of ${this.props.goal}</Progress>

        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Name
              </Table.HeaderCell>
              <Table.HeaderCell>
                Notes
              </Table.HeaderCell>
              <Table.HeaderCell>
                Raised
              </Table.HeaderCell>
              <Table.HeaderCell>

              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.data.map((line, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    <span>
                      {line.lineItem}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>
                      {line.notes}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>
                      ${line.amount}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>
                      <UpdateFundModal socket={this.props.socket} line={line} i={index} index={this.props.index} eventId={this.props.eventId}/>
                      <Icon name='trash' onClick={() => this.deleteFund(index)}/>
                    </span>
                  </Table.Cell>
                </Table.Row>
              )
            }) }
            <Table.Row>
              <Table.Cell>
                <span>
                  <Input
                    placeholder='Name...'
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
                    type='text'
                    placeholder='Notes'
                    onKeyPress={this.handleKeyPress}
                    onChange={e => this.setState({notes: e.target.value})}
                    value={this.state.notes}
                    >
                    </Input>
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span>
                    <Input
                      labelPosition='right'
                      type='number'
                      placeholder='0'
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
                    Total: ${total}
                  </span>
                </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

    )
  }
}
