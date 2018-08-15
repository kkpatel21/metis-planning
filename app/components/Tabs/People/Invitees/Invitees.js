import React, { Component } from 'react'
import { List, Icon, Button, Grid, Divider, Message, Checkbox, Input, Table, Header } from 'semantic-ui-react'
import './Invitees.css'
import AddGuestModal from '../../../Modals/AddGuestModal'
import UpdateGuestModal from '../../../Modals/UpdateGuestModal'
import SendEmailModal from '../../../Modals/SendEmailModal'

export default class Invitees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multipleEmails: [],
      checkboxes: props.guestsList.map((guest) => {
        return false
      })
    }
  }

  multipleEmail = () => {
    let checkedEmails = this.state.checkboxes.map((val, i) => {
      if (val) {
        return this.props.guestsList[i].email
      }
    }).filter(Boolean)
    this.props.sendEmailsBack(checkedEmails)
  }

  delete = (index) => {
    this.props.socket.emit('deleteInvitee', {index: index, guestList: this.props.guestsList, eventId: this.props.eventId})
  }

  toggle = (e) => {
    this.setState({checkboxes: this.props.guestsList.map((guest) => {
      return e
    })}, this.multipleEmail)
  }

  onCheck = (checked, i) => {
    let checkedArray = this.state.checkboxes.slice()
    checkedArray[i] = checked
    this.setState({checkboxes: checkedArray}, this.multipleEmail)
  }

  render() {
    return (
      <div className="peopleTable">
              <Header as='h2'>Invitees</Header>
        <Divider />
          <Table striped basic>
            <Table.Header>
             <Table.Row>
               <Table.HeaderCell><input type='checkbox' name='selectAll' onClick={(e) => this.toggle(e.target.checked)}/> </Table.HeaderCell>
               <Table.HeaderCell>Name</Table.HeaderCell>
               <Table.HeaderCell>Email</Table.HeaderCell>
               <Table.HeaderCell>Status</Table.HeaderCell>
               <Table.HeaderCell>Quick Notes</Table.HeaderCell>
               <Table.HeaderCell><Input icon='search' size='mini' focus placeholder='Search Guests...' onChange={(e) => this.props.filteredList(e.target.value)}/></Table.HeaderCell>
             </Table.Row>
           </Table.Header>

           <Table.Body className="tableList">
             {this.props.guestsList.map((guest, i) => {
               return (
                <Table.Row>
                 <Table.Cell collapsing>
                   <input type="checkbox" name='select' checked={this.state.checkboxes[i]} onClick={(e) => this.onCheck(e.target.checked, i)}/>
                 </Table.Cell>
                 <Table.Cell>{guest.name}</Table.Cell>
                 <Table.Cell>{guest.email}</Table.Cell>
                 <Table.Cell>{guest.status}</Table.Cell>
                 <Table.Cell>{guest.notes}</Table.Cell>
                 <Table.Cell>
                   <UpdateGuestModal socket={this.props.socket} guest={guest} index={i} eventId={this.props.eventId}/> &ensp;
                   <SendEmailModal socket={this.props.socket} guest={guest}/> &ensp;
                   <Icon name='trash' onClick={() => this.delete(i)}/>
                 </Table.Cell>
               </Table.Row>);
             })}
           </Table.Body>

         </Table>
       </div>

    )
  }
}
