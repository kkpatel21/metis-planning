import React, { Component } from 'react'
import { List, Icon, Button, Grid, Divider, Message, Checkbox, Input, Table } from 'semantic-ui-react'
import './People.css'
import AddGuestModal from '../../Modals/AddGuestModal'

export default class People extends React.Component {
  constructor() {
    super();
    this.state = {
      guestsList: []
    }
  }

  componentDidMount() {
    fetch(`/api/getPeople/${this.props.eventId}`)
    .then(res => res.json())
    .then(json => {
      this.setState({ guestsList: json });
    });
  }

  sendDataBack = (guestList) => {
    this.setState({
      guestsList: guestList
    })
  }

  handleEmail = () => {

    fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      creditials: 'same-origin',
    })

    console.log('Done')
  }

  render() {
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

           <Table.Body>
             {this.state.guestsList.map(guest => {
               return (
                <Table.Row>
                 <Table.Cell collapsing>
                   <Checkbox/>
                 </Table.Cell>
                 <Table.Cell>{guest.name}</Table.Cell>
                 <Table.Cell>{guest.email}</Table.Cell>
                 <Table.Cell>{guest.status}</Table.Cell>
                 <Table.Cell>{guest.notes}</Table.Cell>
                 <Table.Cell><Icon name='pencil'/> &ensp;<Icon name='mail' onClick={() => this.handleEmail()} />&ensp;<Icon name='trash' /></Table.Cell>
               </Table.Row>);
             })}
           </Table.Body>

           <Table.Footer fullWidth>
             <Table.Row>
               <Table.HeaderCell />
               <Table.HeaderCell colSpan='5'>
                 <AddGuestModal eventId={this.props.eventId} sendDataBack={this.sendDataBack}/>
               </Table.HeaderCell>
             </Table.Row>
           </Table.Footer>
         </Table>
       </div>

    )
  }
}
