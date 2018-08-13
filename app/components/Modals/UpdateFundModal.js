import React from "react";
import { Button, Header, Image, Modal, Form, Menu, Dropdown, Icon } from "semantic-ui-react";


class UpdateGuestModal extends React.Component {
    constructor() {
        super();
        this.state = {
          lineItem: '',
          notes: '',
          amount: '',
        };
      }

      componentDidMount () {
        this.setState({
          lineItem: this.props.line.lineItem,
          notes: this.props.line.notes,
          amount: this.props.line.amount,
        })
      }
      onTrigger = () => {
        this.setState({open:true})
      }
      onCancel = () => {
        this.setState({open:false})
      }

      onSave = () => {
        let updateFund = {
          'lineItem': this.state.lineItem,
          'notes': this.state.notes,
          'amount': this.state.amount
        }
        this.props.socket.emit('saveFund', {eventId: this.props.eventId, updateFund: updateFund, index: this.props.index, i: this.props.i})
        this.onCancel()

      }

      render() {

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
                    <label>Name </label>
                    <input
                      placeholder="Name"
                      type="text"
                      value={this.state.lineItem}
                      onChange={e => this.setState({ lineItem: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Notes</label>
                    <input
                      placeholder="Notes"
                      type="text"
                      value={this.state.notes}
                      onChange={e => this.setState({ notes: e.target.value })}
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

export default UpdateGuestModal;
