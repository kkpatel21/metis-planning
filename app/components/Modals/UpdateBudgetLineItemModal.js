import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";

const options = [
  { key: 'y', text: 'Yes', value: 'Yes'},
  { key: 'p', text: 'Pending', value: 'Pending'},
  { key: 'n', text: 'No', value: 'No'},
]

export default class UpdateBudgetLineItemModal extends React.Component {
  constructor() {
    super();
    this.state = {
      lineItem: '',
      amount: '',
      approval: '',
    };
  }

  componentDidMount () {
    this.setState({
      lineItem: this.props.lineItem.lineItem,
      amount: this.props.lineItem.amount,
      approval: this.props.lineItem.approval
    })
  }
  onTrigger = () => {
    this.setState({open:true})
  }
  onCancel = () => {
    this.setState({open:false})
  }

  onSave = () => {
    let budgetItem = {
      lineItem: this.state.lineItem,
      amount: this.state.amount,
      approval: this.state.approval
    }
    this.props.socket.emit('updateLineItem', {eventId: this.props.eventId, updateLineItem: budgetItem, i: this.props.i})
    this.onCancel()
  }

  render() {
    const value = this.state.approval
    return (
      <Modal
        trigger={
          <Icon name='pencil' onClick={() => this.onTrigger()}/>
        }
        onClose={this.onCancel}
        open={this.state.open}
        >
          <Modal.Header>{this.state.lineItem}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header />
              <Form >
                <Form.Field>
                  <label>Line Item</label>
                  <input
                    placeholder="Line Item"
                    type="text"
                    value={this.state.lineItem}
                    onChange={e => this.setState({ lineItem: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Amount</label>
                  <input
                    placeholder="Amount"
                    type="number"
                    value={this.state.amount}
                    onChange={e => this.setState({ amount: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <Menu compact>
                    <Dropdown
                      onChange={(e,value) => this.setState({ approval: value.value })}
                      placeholder='Approved?'
                      selection
                      options={options}
                      value={value}
                    />
                  </Menu>
                </Form.Field>
                <Button basic color='teal' type="submit" onClick={() => this.onSave()}>
                  Update
                </Button>
                <Button basic color='orange' type="submit" onClick={() => this.onCancel()}>
                  Cancel
                </Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      )
    }
  }
