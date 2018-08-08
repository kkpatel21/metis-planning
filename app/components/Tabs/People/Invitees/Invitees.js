import React, { Component } from 'react'
import { List, Icon, Button, Grid, Divider, Message, Checkbox, Input, Table } from 'semantic-ui-react'
import './Invitees.css'
import AddGuestModal from '../../../Modals/AddGuestModal'
import UpdateGuestModal from '../../../Modals/UpdateGuestModal'
import SendEmailModal from '../../../Modals/SendEmailModal'

export default class Invitees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multipleEmails: []
    }
  }


  handleEmail = (email, subject, message) => {
    console.log('we here?')
    fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: subject,
        message: message
      })
    })
  }

  multipleEmail = (guestEmail) => {
    console.log(guestEmail)
    if (guestEmail) {
      let emails = this.state.multipleEmails.slice()
      if (emails.indexOf(guestEmail) !== -1) {
        let index = emails.indexOf(guestEmail)
        emails.splice(index, 1)
      } else {
        emails.push(guestEmail)
      }
      this.setState({
        multipleEmails: emails
      })
      console.log('before sending it back', emails)
      this.props.sendEmailsBack(emails)
    }
  }

  render() {
    console.log(this.state.multipleEmails)
    return (
      <div className="peopleTable">
          <Table striped basic>
            <Table.Header>
             <Table.Row>
               <Table.HeaderCell />
               <Table.HeaderCell>Name</Table.HeaderCell>
               <Table.HeaderCell>Email</Table.HeaderCell>
               <Table.HeaderCell>Status</Table.HeaderCell>
               <Table.HeaderCell>Quick Notes</Table.HeaderCell>
               <Table.HeaderCell>Actions</Table.HeaderCell>
             </Table.Row>
           </Table.Header>

           <Table.Body className="tableList">
             {this.props.guestsList.map((guest, i) => {
               return (
                <Table.Row>
                 <Table.Cell collapsing>
                   <Checkbox onClick={() => this.multipleEmail(guest.email)}/>
                 </Table.Cell>
                 <Table.Cell>{guest.name}</Table.Cell>
                 <Table.Cell>{guest.email}</Table.Cell>
                 <Table.Cell>{guest.status}</Table.Cell>
                 <Table.Cell>{guest.notes}</Table.Cell>
                 <Table.Cell>
                   <UpdateGuestModal saveUpdatedData={this.props.saveUpdatedData} guest={guest} index={i} eventId={this.props.eventId} sendDataBack={this.props.sendDataBack}/> &ensp;
                   <SendEmailModal handleEmail={this.handleEmail} guest={guest}/> &ensp;
                   <Icon name='trash' />
                 </Table.Cell>
               </Table.Row>);
             })}
           </Table.Body>

         </Table>
       </div>

    )
  }
}
