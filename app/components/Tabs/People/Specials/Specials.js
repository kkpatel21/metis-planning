import React, { Component } from 'react'
import { List, Icon, Button, Grid, Divider, Message, Checkbox, Input, Table } from 'semantic-ui-react'
import './Specials.css'
import AddGuestModal from '../../../Modals/AddGuestModal'
import UpdateGuestModal from '../../../Modals/UpdateGuestModal'
import SendEmailModal from '../../../Modals/SendEmailModal'

export default class Specials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  delete = (index) => {
    this.props.socket.emit('deleteInvitee', {index: index, guestList: this.props.guestsList, eventId: this.props.eventId})
  }

  render() {
    return (
      <div className="specialTable">
          <Table striped basic>
            <Table.Header>
             <Table.Row>
               <Table.HeaderCell>Name</Table.HeaderCell>
               <Table.HeaderCell>Phone</Table.HeaderCell>
               <Table.HeaderCell>Email</Table.HeaderCell>
               <Table.HeaderCell>Status</Table.HeaderCell>
               <Table.HeaderCell>Quick Notes</Table.HeaderCell>
               <Table.HeaderCell><Input icon='search' size='mini' focus placeholder='Search Guests...' onChange={(e) => this.props.filteredList(e.target.value)}/></Table.HeaderCell>
             </Table.Row>
           </Table.Header>

           <Table.Body className="tableList">
             {this.props.specialsList.map((guest, i) => {
               return (
                <Table.Row>
                 <Table.Cell>{guest.name}</Table.Cell>
                 <Table.Cell>{guest.phone}</Table.Cell>
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
